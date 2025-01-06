import unittest
import os
import json
import yaml
from pydantic import ValidationError
from config_manager import ConfigManager, Config
from logger import Logger

class TestConfigManager(unittest.TestCase):
    def setUp(self):
        """Set up test environment."""
        self.config_file_json = 'test_config.json'
        self.config_file_yaml = 'test_config.yaml'
        self.valid_config = {
            "app_name": "TestApp",
            "version": "1.0",
            "debug": True,
            "database_url": "postgres://user:password@localhost:5432/testdb"
        }
        self.invalid_config = {
            "app_name": "TestApp",
            "version": "1.0",
            "debug": True,
            "database_url": "invalid_url"
        }

        # Create valid config files for testing
        with open(self.config_file_json, 'w') as f:
            json.dump(self.valid_config, f)
        with open(self.config_file_yaml, 'w') as f:
            yaml.dump(self.valid_config, f)

    def tearDown(self):
        """Clean up test environment."""
        os.remove(self.config_file_json)
        os.remove(self.config_file_yaml)

    def test_load_valid_json_config(self):
        """Test loading a valid JSON configuration."""
        config_manager = ConfigManager(self.config_file_json)
        self.assertEqual(config_manager.get('app_name'), "TestApp")
        self.assertEqual(config_manager.get('version'), "1.0")
        self.assertTrue(config_manager.get('debug'))
        self.assertEqual(config_manager.get('database_url'), "postgres://user:password@localhost:5432/testdb")

    def test_load_valid_yaml_config(self):
        """Test loading a valid YAML configuration."""
        config_manager = ConfigManager(self.config_file_yaml)
        self.assertEqual(config_manager.get('app_name'), "TestApp")
        self.assertEqual(config_manager.get('version'), "1.0")
        self.assertTrue(config_manager.get('debug'))
        self.assertEqual(config_manager.get('database_url'), "postgres://user:password@localhost:5432/testdb")

    def test_load_invalid_config(self):
        """Test loading an invalid configuration raises a validation error."""
        with open('invalid_config.json', 'w') as f:
            json.dump(self.invalid_config, f)
        with self.assertRaises(ValidationError):
            ConfigManager('invalid_config.json')
        os.remove('invalid_config.json')

class TestLogger(unittest.TestCase):
    def setUp(self):
        """Set up test environment for logger."""
        self.logger = Logger(__name__, log_file='test.log')

    def tearDown(self):
        """Clean up test environment."""
        if os.path.exists('test.log'):
            os.remove('test.log')

    def test_logging_levels(self):
        """Test logging at different levels."""
        self.logger.debug("Debug message")
        self.logger.info("Info message")
        self.logger.warning("Warning message")
        self.logger.error("Error message")
        self.logger.critical("Critical message")

        # Check if the log file exists and contains the expected messages
        with open('test.log', 'r') as f:
            log_contents = f.read()
            self.assertIn("Debug message", log_contents)
            self.assertIn("Info message", log_contents)
            self.assertIn("Warning message", log_contents)
            self.assertIn("Error message", log_contents)
            self.assertIn("Critical message", log_contents)

if __name__ == '__main__':
    unittest.main()
