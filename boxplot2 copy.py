import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# --- Data Loading and Preparation ---

try:
    # Load the dataset from the CSV file provided.
    df = pd.read_csv("Boxplot data.csv")

    # Filter the DataFrame to only include rows where the 'Eval Bucket' is '1-3M'.
    df_filtered = df[df['Eval Bucket'] == '1-3M'].copy()

    # --- Part 1: Boxplot Generation for 'Level Accuracy Medical' ---

    # CORRECTED: Define a mapping from the new string categories to numerical values.
    level_mapping = {
        'Master Performance': 4,
        'Advanced Performance': 3,
        'Average Performance': 2,
        'Limited Performance': 1,
        'Minimal Performance': 0
    }
    
    # Create a new column with the numerical representation of the levels.
    # .get(x, pd.NA) handles any values not in the mapping dictionary.
    data_for_plot = df_filtered['Level Accuracy Medical'].apply(lambda x: level_mapping.get(x, pd.NA)).dropna()

    if not data_for_plot.empty:
        # Set a visually appealing style for the plot.
        sns.set_theme(style="whitegrid")
        plt.figure(figsize=(8, 10))

        # Create the boxplot from the converted numerical data.
        ax = sns.boxplot(y=data_for_plot)
        ax.set_title("Distribution of 'Level Accuracy Medical' (1-3M Bucket)", fontsize=16)
        ax.set_ylabel("Performance Level", fontsize=12)
        
        # Set custom labels for the y-axis to show the original string values.
        ax.set_yticks(list(level_mapping.values()))
        ax.set_yticklabels(list(level_mapping.keys()))

        print("Displaying boxplot... Please close the plot window to see the report.")
        plt.tight_layout()
        plt.show()
    else:
        print("No data found for 'Level Accuracy Medical' to generate a plot.")

    # --- Part 2: Agent Performance Report Generation ---

    # Group by both Agent Email and Supervisor to keep the supervisor info.
    # Calculate the mean of 'Accuracy Medical' for each agent.
    agent_data = df_filtered.groupby(['Agent Email', 'Current Sup'])['Accuracy Medical'].mean().dropna()

    # Convert the Series back to a DataFrame for easier manipulation.
    agent_df = agent_data.reset_index()
    agent_df.rename(columns={'Accuracy Medical': 'Average Medical Accuracy'}, inplace=True)

    # --- Quartile Calculation ---
    # Calculate the quartile values from the distribution of average scores.
    q1 = agent_df['Average Medical Accuracy'].quantile(0.25)
    median = agent_df['Average Medical Accuracy'].quantile(0.50)
    q3 = agent_df['Average Medical Accuracy'].quantile(0.75)

    # --- Quartile Assignment Function ---
    def assign_quartile(score):
        if score <= q1:
            return "Bottom 25% (Q1)"
        elif score <= median:
            return "25-50% (Q2)"
        elif score <= q3:
            return "50-75% (Q3)"
        else:
            return "Top 25% (Q4)"

    # Apply the function to create a new 'Quartile' column.
    agent_df['Quartile'] = agent_df['Average Medical Accuracy'].apply(assign_quartile)
    
    # --- Final Report Generation ---
    # Sort the dataframe by the average score for a clean, ranked view.
    final_report = agent_df.sort_values(by='Average Medical Accuracy', ascending=False)

    # Print the final report to the console.
    print("\n--- Agent Performance Report by Quartile (1-3M Bucket) ---")
    print(final_report.to_string())
    
    # Also print the quartile thresholds for reference
    print("\n--- Quartile Thresholds ---")
    print(f"Bottom 25% are at or below: {q1:.2f}")
    print(f"25-50% are between {q1:.2f} and {median:.2f}")
    print(f"50-75% are between {median:.2f} and {q3:.2f}")
    print(f"Top 25% are above: {q3:.2f}")


except FileNotFoundError:
    print("Error: 'Boxplot data.xlsx - Sheet1.csv' not found.")
    print("Please make sure the data file is in the same folder as the script.")
except KeyError as e:
    print(f"Error: A required column was not found in the CSV file: {e}")
    print("Please ensure the CSV contains all required columns.")