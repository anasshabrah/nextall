import os

# Define the search term
search_term = "LuUser2"

# Define the file extensions to search for
file_extensions = ('.ts', '.tsx', '.js', '.jsx', '.json')

# Define the folders to exclude
excluded_folders = {'.next', 'node_modules', '.git', '.ssh'}

# Function to search for the term in files
def search_in_files(root_folder):
    for root, dirs, files in os.walk(root_folder):
        # Modify dirs in place to skip excluded folders
        dirs[:] = [d for d in dirs if d not in excluded_folders]
        
        for file in files:
            if file.endswith(file_extensions):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if search_term in content:
                            print(f"Found in: {file_path}")
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")

# Specify the main folder path here
main_folder = '.'  # '.' represents the current directory. You can replace this with any path.

# Run the search
search_in_files(main_folder)
