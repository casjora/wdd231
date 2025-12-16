import pandas as pd

# --- Data Loading and Preparation ---

try:
    # Load the dataset from the CSV file provided.
    df = pd.read_csv("Boxplot data.csv")

    # Filter the DataFrame to only include rows where the 'Eval Bucket' is '1-3M'.
    df_filtered = df[df['Eval Bucket'] == '1-3M'].copy()

    # --- Aggregation Step ---
    # Group by both Agent Email and Supervisor to keep the supervisor info.
    # Calculate the mean of 'Accuracy Medical' for each agent.
    # The result is a Series with a MultiIndex (Agent Email, Supervisor).
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
    # This function assigns a descriptive quartile label based on an agent's score.
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
    print("--- Agent Performance Report by Quartile (1-3M Bucket) ---")
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
    print("Please ensure the CSV contains 'Eval Bucket', 'Agent Email', 'Supervisor', and 'Accuracy Medical' columns.")