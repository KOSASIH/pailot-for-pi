import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from typing import List, Optional

class DataPreprocessor:
    def __init__(self, data: pd.DataFrame):
        """
        Initialize the DataPreprocessor with a DataFrame.

        :param data: A pandas DataFrame containing the data to preprocess.
        """
        self.data = data

    def handle_missing_values(self, strategy: str = 'mean', columns: Optional[List[str]] = None):
        """
        Handle missing values in the DataFrame.

        :param strategy: The strategy to use for filling missing values ('mean', 'median', 'mode', 'drop').
        :param columns: List of columns to apply the strategy. If None, apply to all columns.
        """
        if columns is None:
            columns = self.data.columns.tolist()

        for column in columns:
            if strategy == 'mean':
                self.data[column].fillna(self.data[column].mean(), inplace=True)
            elif strategy == 'median':
                self.data[column].fillna(self.data[column].median(), inplace=True)
            elif strategy == 'mode':
                self.data[column].fillna(self.data[column].mode()[0], inplace=True)
            elif strategy == 'drop':
                self.data.dropna(subset=[column], inplace=True)
            else:
                raise ValueError("Invalid strategy. Choose from 'mean', 'median', 'mode', or 'drop'.")

    def normalize_data(self, method: str = 'standard', columns: Optional[List[str]] = None):
        """
        Normalize the data in the DataFrame.

        :param method: The normalization method ('standard' for StandardScaler, 'minmax' for MinMaxScaler).
        :param columns: List of columns to normalize. If None, apply to all numeric columns.
        """
        if columns is None:
            columns = self.data.select_dtypes(include=['float64', 'int']).columns.tolist()

        if method == 'standard':
            scaler = StandardScaler()
        elif method == 'minmax':
            scaler = MinMaxScaler()
        else:
            raise ValueError("Invalid method. Choose 'standard' or 'minmax'.")

        self.data[columns] = scaler.fit_transform(self.data[columns])

    def feature_engineering(self, new_column_name: str, operation: str, column1: str, column2: str):
        """
        Create a new feature based on existing columns.

        :param new_column_name: The name of the new feature.
        :param operation: The operation to perform ('add', 'subtract', 'multiply', 'divide').
        :param column1: The first column to use in the operation.
        :param column2: The second column to use in the operation.
        """
        if operation == 'add':
            self.data[new_column_name] = self.data[column1] + self.data[column2]
        elif operation == 'subtract':
            self.data[new_column_name] = self.data[column1] - self.data[column2]
        elif operation == 'multiply':
            self.data[new_column_name] = self.data[column1] * self.data[column2]
        elif operation == 'divide':
            self.data[new_column_name] = self.data[column1] / self.data[column2]
        else:
            raise ValueError("Invalid operation. Choose 'add', 'subtract', 'multiply', or 'divide'.")

# Example usage
if __name__ == "__main__":
    # Sample data
    data = {
        'A': [1, 2, None, 4],
        'B': [5, None, 7, 8],
        'C': [10, 20, 30, 40]
    }
    df = pd.DataFrame(data)

    preprocessor = DataPreprocessor(df)

    # Handle missing values
    preprocessor.handle_missing_values(strategy='mean')
    print("Data after handling missing values:\n", preprocessor.data)

    # Normalize data
    preprocessor.normalize_data(method='standard', columns=['A', 'B'])
    print("Data after normalization:\n", preprocessor.data)

    # Feature engineering
    preprocessor.feature_engineering(new_column_name='D', operation='add', column1='A', column2='B')
    print("Data after feature engineering:\n", preprocessor.data)
