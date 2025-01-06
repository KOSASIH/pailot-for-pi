import time
import tracemalloc
import logging
from contextlib import contextmanager

class PerformanceMonitor:
    def __init__(self, logger: logging.Logger):
        """
        Initialize the PerformanceMonitor.

        :param logger: A logger instance to log performance metrics.
        """
        self.logger = logger

    @contextmanager
    def measure_time(self, operation_name: str):
        """
        Context manager to measure the execution time of a block of code.

        :param operation_name: Name of the operation being measured.
        """
        start_time = time.time()
        yield
        end_time = time.time()
        execution_time = end_time - start_time
        self.logger.info(f"{operation_name} executed in {execution_time:.4f} seconds")

    def start_memory_tracking(self):
        """Start tracking memory usage."""
        tracemalloc.start()

    def stop_memory_tracking(self):
        """Stop tracking memory usage and log the peak memory usage."""
        current, peak = tracemalloc.get_traced_memory()
        tracemalloc.stop()
        self.logger.info(f"Current memory usage: {current / 10**6:.4f} MB; Peak: {peak / 10**6:.4f} MB")

# Example usage
if __name__ == "__main__":
    # Set up logging
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    logger = logging.getLogger(__name__)

    performance_monitor = PerformanceMonitor(logger)

    # Measure execution time
    with performance_monitor.measure_time("Sample Operation"):
        # Simulate a time-consuming operation
        time.sleep(2)

    # Measure memory usage
    performance_monitor.start_memory_tracking()
    # Simulate memory usage
    _ = [i for i in range(10**6)]  # Allocate memory
    performance_monitor.stop_memory_tracking()
