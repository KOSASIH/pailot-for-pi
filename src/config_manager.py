import os
import json
import yaml
from pydantic import BaseModel, ValidationError, validator
from typing import Any, Dict, Optional

class Config(BaseModel):
    # Define your configuration parameters here with types
    app_name: str
    version: str
    debug: bool
    database_url: str
    api_key: Optional[str] = None

    @validator('database_url')
    def validate_database_url(cls, v):
        if not v.startswith("postgres://") and not v.startswith("mysql://"):
            raise ValueError('Database URL must start with "postgres://" or "mysql://"')
        return v

class ConfigManager:
    def __init__(self, config_file: str):
        self.config_file = config_file
        self.config: Optional[Config] = None
        self.load_config()

    def load_config(self):
        """Load configuration from a file or environment variables."""
        if os.path.exists(self.config_file):
            with open(self.config_file, 'r') as file:
                if self.config_file.endswith('.json'):
                    config_data = json.load(file)
                elif self.config_file.endswith('.yaml') or self.config_file.endswith('.yml'):
                    config_data = yaml.safe_load(file)
                else:
                    raise ValueError("Unsupported config file format. Use .json or .yaml")
        else:
            config_data = {}

        # Override with environment variables if they exist
        for key in config_data.keys():
            env_value = os.getenv(key.upper())
            if env_value is not None:
                config_data[key] = env_value

        # Validate and set the configuration
        try:
            self.config = Config(**config_data)
        except ValidationError as e:
            print("Configuration validation error:", e)
            raise

    def get(self, key: str) -> Any:
        """Get a configuration value by key."""
        if self.config is None:
            raise ValueError("Configuration not loaded.")
        return getattr(self.config, key)

    def reload(self):
        """Reload the configuration from the file."""
        print("Reloading configuration...")
        self.load_config()

# Example usage
if __name__ == "__main__":
    config_manager = ConfigManager('config.yaml')  # or 'config.json'
    print("App Name:", config_manager.get('app_name'))
    print("Version:", config_manager.get('version'))
    print("Debug Mode:", config_manager.get('debug'))
    print("Database URL:", config_manager.get('database_url'))
