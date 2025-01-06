import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
from typing import Any, Dict, List, Optional

class DataVisualizer:
    def __init__(self, data: pd.DataFrame):
        """
        Initialize the DataVisualizer with a DataFrame.

        :param data: A pandas DataFrame containing the data to visualize.
        """
        self.data = data

    def line_plot(self, x: str, y: str, title: str = "Line Plot", xlabel: str = "", ylabel: str = "", save_path: Optional[str] = None):
        """Create a line plot.

        :param x: Column name for the x-axis.
        :param y: Column name for the y-axis.
        :param title: Title of the plot.
        :param xlabel: Label for the x-axis.
        :param ylabel: Label for the y-axis.
        :param save_path: Path to save the plot image.
        """
        plt.figure(figsize=(10, 6))
        plt.plot(self.data[x], self.data[y], marker='o')
        plt.title(title)
        plt.xlabel(xlabel)
        plt.ylabel(ylabel)
        plt.grid()
        if save_path:
            plt.savefig(save_path)
        plt.show()

    def bar_plot(self, x: str, y: str, title: str = "Bar Plot", xlabel: str = "", ylabel: str = "", save_path: Optional[str] = None):
        """Create a bar plot.

        :param x: Column name for the x-axis.
        :param y: Column name for the y-axis.
        :param title: Title of the plot.
        :param xlabel: Label for the x-axis.
        :param ylabel: Label for the y-axis.
        :param save_path: Path to save the plot image.
        """
        plt.figure(figsize=(10, 6))
        sns.barplot(data=self.data, x=x, y=y)
        plt.title(title)
        plt.xlabel(xlabel)
        plt.ylabel(ylabel)
        if save_path:
            plt.savefig(save_path)
        plt.show()

    def scatter_plot(self, x: str, y: str, title: str = "Scatter Plot", xlabel: str = "", ylabel: str = "", save_path: Optional[str] = None):
        """Create a scatter plot.

        :param x: Column name for the x-axis.
        :param y: Column name for the y-axis.
        :param title: Title of the plot.
        :param xlabel: Label for the x-axis.
        :param ylabel: Label for the y-axis.
        :param save_path: Path to save the plot image.
        """
        plt.figure(figsize=(10, 6))
        sns.scatterplot(data=self.data, x=x, y=y)
        plt.title(title)
        plt.xlabel(xlabel)
        plt.ylabel(ylabel)
        if save_path:
            plt.savefig(save_path)
        plt.show()

    def histogram(self, column: str, title: str = "Histogram", xlabel: str = "", ylabel: str = "Frequency", bins: int = 10, save_path: Optional[str] = None):
        """Create a histogram.

        :param column: Column name to create the histogram for.
        :param title: Title of the plot.
        :param xlabel: Label for the x-axis.
        :param ylabel: Label for the y-axis.
        :param bins: Number of bins for the histogram.
        :param save_path: Path to save the plot image.
        """
        plt.figure(figsize=(10, 6))
        plt.hist(self.data[column], bins=bins, edgecolor='black')
        plt.title(title)
        plt.xlabel(xlabel)
        plt.ylabel(ylabel)
        if save_path:
            plt.savefig(save_path)
        plt.show()

    def box_plot(self, x: str, y: str, title: str = "Box Plot", xlabel: str = "", ylabel: str = "", save_path: Optional[str] = None):
        """Create a box plot.

        :param x: Column name for the x-axis (categorical).
        :param y: Column name for the y-axis (numerical).
        :param title: Title of the plot.
        :param xlabel: Label for the x-axis.
        :param ylabel: Label for the y-axis.
        :param save_path: Path to save the plot image.
        """
        plt.figure(figsize=(10, 6))
        sns.boxplot(data=self.data, x=x, y=y)
        plt.title(title)
        plt.xlabel(xlabel)
        plt.ylabel(ylabel)
        if save_path:
            plt.savefig(save_path)
        plt.show()

    def heatmap(self, data: pd.DataFrame, title: str = "Heatmap", save_path: Optional[str] = None):
        """Create a heatmap.

        :param data: A DataFrame to visualize as a heatmap.
        :param title: Title of the heatmap.
        :param save_path: Path to save the plot image.
        """
        plt.figure(figsize=(10, 6))
        sns.heatmap(data, annot=True, fmt=".2f", cmap='coolwarm')
        plt.title(title)
        if save_path:
            plt.savefig(save_path)
        plt.show()

# Example usage:
# df = pd.DataFrame({
#     'x': [1, 2, 3, 4, 5],
#     'y': [2, 3, 5, 7, 11],
#     'category': ['A', 'B', 'A', 'B', 'A']
# })
# visualizer = DataVisualizer(df)
# visualizer.line_plot(x='x', y='y', title='Example Line Plot', xlabel='X Axis', ylabel='Y Axis')
# visualizer.bar_plot(x='category', y='y', title='Example Bar Plot', xlabel='Category', ylabel='Values')
