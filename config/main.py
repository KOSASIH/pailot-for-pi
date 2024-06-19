import os
import logging
import asyncio
from config import settings
from services.pilot_service import PilotService
from services.sensor_service import SensorService
from utils.constants import PILOT_SYSTEM_MODES
from utils.helpers import get_current_time, get_pilot_system_mode
from api.rest_api import create_app
from database.db import init_db
from security.auth import authenticate, authorize
from monitoring.prometheus_client import start_prometheus_client

logging.config.fileConfig('logging.conf')

async def pilot_system_loop(pilot_service, sensor_service):
    while True:
        try:
            # Get sensor data
            sensor_data = await sensor_service.get_sensor_data_async()

            # Process pilot system logic
            pilot_system_mode = get_pilot_system_mode()
            if pilot_system_mode == PILOT_SYSTEM_MODES.AUTO:
                await pilot_service.process_pilot_system_logic_async(sensor_data)
            elif pilot_system_mode == PILOT_SYSTEM_MODES.MANUAL:
                # Handle manual mode logic
                pass
            else:
                logging.error(f"Invalid pilot system mode: {pilot_system_mode}")

            # Sleep for a short period
            await asyncio.sleep(0.1)
        except Exception as e:
            logging.error(f"Error in pilot system loop: {e}")

async def main():
    # Initialize pilot system
    pilot_service = PilotService()
    sensor_service = SensorService()

    # Initialize database
    init_db()

    # Start Prometheus client
    start_prometheus_client()

    # Create REST API app
    app = create_app()

    # Start API server
    api_server = asyncio.create_task(app.run_task('0.0.0.0', 5000))

    # Start pilot system loop
    pilot_system_loop_task = asyncio.create_task(pilot_system_loop(pilot_service, sensor_service))

    # Start authentication and authorization
    auth_task = asyncio.create_task(authenticate())
    auth_task.add_done_callback(authorize)

    # Wait for tasks to complete
    await asyncio.gather(api_server, pilot_system_loop_task, auth_task)

if __name__ == '__main__':
    asyncio.run(main())
