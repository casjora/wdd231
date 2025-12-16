import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# --- Data Loading and Preparation ---

try:
    # Load the dataset from the CSV file provided.
    # Make sure the file "Boxplot data.xlsx - Sheet1.csv" is in the same directory
    # as this Python script.
    df = pd.read_csv("Boxplot data.csv")

    # Filter the DataFrame to only include rows where the 'Eval Bucket' is '1-3M'.
    # The .copy() is used to avoid a SettingWithCopyWarning from pandas.
    df_filtered = df[df['Eval Bucket'] == '1-3M'].copy()

    # Further select the 'Score' column for our plot.
    # We also drop any rows that might have missing values in this specific column
    # to ensure the plot renders correctly.
    data_to_plot = df_filtered['Score'].dropna()

    # --- Plotting ---

    # Set a visually appealing style for the plot.
    sns.set_theme(style="whitegrid")

    # Create a figure and axis object to hold our plot.
    # This gives us more control over the plot's appearance.
    plt.figure(figsize=(8, 10))

    # Create the boxplot using seaborn.
    # We pass the filtered data to the 'y' axis.
    ax = sns.boxplot(y=data_to_plot)

    # --- Customization and Labels ---

    # Set a clear and descriptive title for the plot.
    plt.title('Distribution of Scores for 1-3M Eval Bucket', fontsize=16)

    # Set the label for the y-axis.
    plt.ylabel('Score', fontsize=12)

    # Add annotations to explain the parts of the boxplot.
    # We calculate the statistics from our data to place the labels correctly.
    median = data_to_plot.median()
    q1 = data_to_plot.quantile(0.25)
    q3 = data_to_plot.quantile(0.75)
    
    # Add text labels for median, quartiles, etc.
    # The xy coordinates are chosen to place the text nicely next to the plot.
    # The xytext coordinates are relative to the data points.
    ax.text(0.55, median, f'Median: {median:.2f}',
            verticalalignment='center', size='medium', color='black', weight='semibold')
    ax.text(0.55, q3, f'Upper Quartile (Q3): {q3:.2f}',
            verticalalignment='center', size='medium', color='black')
    ax.text(0.55, q1, f'Lower Quartile (Q1): {q1:.2f}',
            verticalalignment='center', size='medium', color='black')


    # --- Display the Plot ---

    # Ensure the plot layout is tight and clean before displaying.
    plt.tight_layout()

    # Show the final plot.
    plt.show()

except FileNotFoundError:
    print("Error: 'Boxplot data.xlsx - Sheet1.csv' not found.")
    print("Please make sure the data file is in the same folder as the script.")
except KeyError as e:
    print(f"Error: A required column was not found in the CSV file: {e}")
    print("Please ensure the CSV contains 'Eval Bucket' and 'Score' columns.")
    