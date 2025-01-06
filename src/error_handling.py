import logging
import traceback

class CustomError(Exception):
    """Base class for custom exceptions in the application."""
    pass

class FileNotFoundError(CustomError):
    """Exception raised for errors in the file not found."""
    def __init__(self, filename: str):
        self.filename = filename
        super().__init__(f"File not found: {self.filename}")

class DataValidationError(CustomError):
    """Exception raised for errors in data validation."""
    def __init__(self, message: str):
        super().__init__(f"Data validation error: {message}")

class APIRequestError(CustomError):
    """Exception raised for errors in API requests."""
    def __init__(self, endpoint: str, status_code: int):
        self.endpoint = endpoint
        self.status_code = status_code
        super().__init__(f"API request error at {self.endpoint}: Status code {self.status_code}")

class ErrorHandler:
    def __init__(self, logger: logging.Logger):
        self.logger = logger

    def log_error(self, error: Exception):
        """Log the error with traceback."""
        self.logger.error(f"An error occurred: {error}")
        self.logger.error(traceback.format_exc())

    def handle_file_not_found(self, filename: str):
        """Handle file not found errors."""
        error = FileNotFoundError(filename)
        self.log_error(error)
        return str(error)

    def handle_data_validation_error(self, message: str):
        """Handle data validation errors."""
        error = DataValidationError(message)
        self.log_error(error)
        return str(error)

    def handle_api_request_error(self, endpoint: str, status_code: int):
        """Handle API request errors."""
        error = APIRequestError(endpoint, status_code)
        self.log_error(error)
        return str(error)

# Example usage
if __name__ == "__main__":
    # Set up logging
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    logger = logging.getLogger(__name__)

    error_handler = ErrorHandler(logger)

    # Simulate error handling
    try:
        # Simulate a file not found error
        raise FileNotFoundError("data.csv")
    except FileNotFoundError as e:
        print(error_handler.handle_file_not_found("data.csv"))

    try:
        # Simulate a data validation error
        raise DataValidationError("Invalid value in column 'age'")
    except DataValidationError as e:
        print(error_handler.handle_data_validation_error("Invalid value in column 'age'"))

    try:
        # Simulate an API request error
        raise APIRequestError("/api/data", 404)
    except APIRequestError as e:
        print(error_handler.handle_api_request_error("/api/data", 404))
