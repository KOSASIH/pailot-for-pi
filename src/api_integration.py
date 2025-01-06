import requests
import time
import json
from typing import Any, Dict, Optional, Union

class APIClient:
    def __init__(self, base_url: str, api_key: Optional[str] = None):
        """
        Initialize the API client.

        :param base_url: The base URL of the API.
        :param api_key: Optional API key for authentication.
        """
        self.base_url = base_url
        self.api_key = api_key
        self.session = requests.Session()
        if api_key:
            self.session.headers.update({'Authorization': f'Bearer {api_key}'})

    def get(self, endpoint: str, params: Optional[Dict[str, Any]] = None) -> Union[Dict[str, Any], None]:
        """
        Make a GET request to the API.

        :param endpoint: The API endpoint to call.
        :param params: Optional query parameters for the request.
        :return: The JSON response as a dictionary, or None if an error occurs.
        """
        url = f"{self.base_url}/{endpoint}"
        try:
            response = self.session.get(url, params=params)
            response.raise_for_status()  # Raise an error for bad responses
            return response.json()
        except requests.exceptions.HTTPError as err:
            print(f"HTTP error occurred: {err}")
        except requests.exceptions.RequestException as err:
            print(f"Error occurred: {err}")
        return None

    def post(self, endpoint: str, data: Dict[str, Any]) -> Union[Dict[str, Any], None]:
        """
        Make a POST request to the API.

        :param endpoint: The API endpoint to call.
        :param data: The data to send in the request body.
        :return: The JSON response as a dictionary, or None if an error occurs.
        """
        url = f"{self.base_url}/{endpoint}"
        try:
            response = self.session.post(url, json=data)
            response.raise_for_status()  # Raise an error for bad responses
            return response.json()
        except requests.exceptions.HTTPError as err:
            print(f"HTTP error occurred: {err}")
        except requests.exceptions.RequestException as err:
            print(f"Error occurred: {err}")
        return None

    def set_api_key(self, api_key: str):
        """Set the API key for authentication."""
        self.api_key = api_key
        self.session.headers.update({'Authorization': f'Bearer {api_key}'})

    def rate_limited_get(self, endpoint: str, params: Optional[Dict[str, Any]] = None, rate_limit: int = 1) -> Union[Dict[str, Any], None]:
        """
        Make a rate-limited GET request to the API.

        :param endpoint: The API endpoint to call.
        :param params: Optional query parameters for the request.
        :param rate_limit: Number of requests allowed per second.
        :return: The JSON response as a dictionary, or None if an error occurs.
        """
        time.sleep(1 / rate_limit)  # Sleep to respect rate limit
        return self.get(endpoint, params)

    def rate_limited_post(self, endpoint: str, data: Dict[str, Any], rate_limit: int = 1) -> Union[Dict[str, Any], None]:
        """
        Make a rate-limited POST request to the API.

        :param endpoint: The API endpoint to call.
        :param data: The data to send in the request body.
        :param rate_limit: Number of requests allowed per second.
        :return: The JSON response as a dictionary, or None if an error occurs.
        """
        time.sleep(1 / rate_limit)  # Sleep to respect rate limit
        return self.post(endpoint, data)

# Example usage:
if __name__ == "__main__":
    api_client = APIClient(base_url="https://api.example.com", api_key="your_api_key")

    # Example GET request
    response = api_client.get("data/endpoint", params={"param1": "value1"})
    print("GET Response:", response)

    # Example POST request
    post_data = {"key": "value"}
    response = api_client.post("data/endpoint", data=post_data)
    print("POST Response:", response)

    # Example rate-limited GET request
    response = api_client.rate_limited_get("data/endpoint", params={"param1": "value1"}, rate_limit=2)
    print("Rate-Limited GET Response:", response)

    # Example rate-limited POST request
    response = api_client.rate ```python
    response = api_client.rate_limited_post("data/endpoint", data=post_data, rate_limit=2)
    print("Rate-Limited POST Response:", response)
