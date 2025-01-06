import tkinter as tk
from tkinter import messagebox, filedialog
import pandas as pd
from data_visualization import DataVisualizer
from api_integration import APIClient

class Application(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Data Visualization and API Integration")
        self.geometry("600x400")

        # Create UI components
        self.create_widgets()

    def create_widgets(self):
        # Input Frame
        input_frame = tk.Frame(self)
        input_frame.pack(pady=20)

        self.file_label = tk.Label(input_frame, text="Select CSV File:")
        self.file_label.grid(row=0, column=0)

        self.file_entry = tk.Entry(input_frame, width=40)
        self.file_entry.grid(row=0, column=1)

        self.browse_button = tk.Button(input_frame, text="Browse", command=self.browse_file)
        self.browse_button.grid(row=0, column=2)

        self.visualize_button = tk.Button(self, text="Visualize Data", command=self.visualize_data)
        self.visualize_button.pack(pady=10)

        self.api_frame = tk.Frame(self)
        self.api_frame.pack(pady=20)

        self.api_key_label = tk.Label(self.api_frame, text="API Key:")
        self.api_key_label.grid(row=0, column=0)

        self.api_key_entry = tk.Entry(self.api_frame, width=40)
        self.api_key_entry.grid(row=0, column=1)

        self.api_endpoint_label = tk.Label(self.api_frame, text="API Endpoint:")
        self.api_endpoint_label.grid(row=1, column=0)

        self.api_endpoint_entry = tk.Entry(self.api_frame, width=40)
        self.api_endpoint_entry.grid(row=1, column=1)

        self.api_data_button = tk.Button(self.api_frame, text="Fetch Data from API", command=self.fetch_data_from_api)
        self.api_data_button.grid(row=2, columnspan=2, pady=10)

    def browse_file(self):
        """Open a file dialog to select a CSV file."""
        file_path = filedialog.askopenfilename(filetypes=[("CSV files", "*.csv")])
        if file_path:
            self.file_entry.delete(0, tk.END)
            self.file_entry.insert(0, file_path)

    def visualize_data(self):
        """Visualize data from the selected CSV file."""
        file_path = self.file_entry.get()
        if not file_path:
            messagebox.showerror("Error", "Please select a CSV file.")
            return

        try:
            data = pd.read_csv(file_path)
            visualizer = DataVisualizer(data)
            visualizer.line_plot(x=data.columns[0], y=data.columns[1], title="Line Plot", xlabel=data.columns[0], ylabel=data.columns[1])
        except Exception as e:
            messagebox.showerror("Error", f"Failed to visualize data: {e}")

    def fetch_data_from_api(self):
        """Fetch data from the specified API endpoint."""
        api_key = self.api_key_entry.get()
        endpoint = self.api_endpoint_entry.get()

        if not api_key or not endpoint:
            messagebox.showerror("Error", "Please enter both API Key and Endpoint.")
            return

        api_client = APIClient(base_url="https://api.example.com", api_key=api_key)
        response = api_client.get(endpoint)

        if response:
            messagebox.showinfo("API Response", f"Data fetched successfully: {response}")
        else:
            messagebox.showerror("Error", "Failed to fetch data from API.")

if __name__ == "__main__":
    app = Application()
    app.mainloop()
