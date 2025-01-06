import logging
import os
from logging.handlers import RotatingFileHandler

class Logger:
    def __init__(self, name: str, log_file: str = 'app.log', max_bytes: int = 10 * 1024 * 1024, backup_count: int = 5):
        """
        Initialize the logger.

        :param name: Name of the logger (usually the module name).
        :param log_file: Path to the log file.
        :param max_bytes: Maximum size of the log file before rotation.
        :param backup_count: Number of backup files to keep.
        """
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.DEBUG)

        # Create a formatter
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.DEBUG)
        console_handler.setFormatter(formatter)

        # File handler with rotation
        file_handler = RotatingFileHandler(log_file, maxBytes=max_bytes, backupCount=backup_count)
        file_handler.setLevel(logging.INFO)  # Log INFO and above to file
        file_handler.setFormatter(formatter)

        # Add handlers to the logger
        self.logger.addHandler(console_handler)
        self.logger.addHandler(file_handler)

    def debug(self, message: str):
        """Log a debug message."""
        self.logger.debug(message)

    def info(self, message: str):
        """Log an info message."""
        self.logger.info(message)

    def warning(self, message: str):
        """Log a warning message."""
        self.logger.warning(message)

    def error(self, message: str):
        """Log an error message."""
        self.logger.error(message)

    def exception(self, message: str):
        """Log an exception with traceback."""
        self.logger.exception(message)

    def critical(self, message: str):
        """Log a critical message."""
        self.logger.critical(message)

# Example usage
if __name__ == "__main__":
    logger = Logger(__name__)
    logger.info("This is an info message.")
    logger.debug("This is a debug message.")
    logger.warning("This is a warning message.")
    try:
        1 / 0  # This will raise an exception
    except ZeroDivisionError:
        logger.exception("An exception occurred.")
    logger.critical("This is a critical message.")
