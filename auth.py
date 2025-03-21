import os
import re

# Define the search terms as a list
search_terms = [
    "Authorization",
    "refreshToken",
    "accessToken",
    "token",
    "jwt",
    "bcrypt",
    "hash",
    "saltRounds",
    "encrypt",
    "decrypt",
    "secureCookie",
    "httpOnly",
    "sameSite",
    "localStorage",
    "sessionStorage",
    "cookies",
    "redux-persist",
    "getAuthHeader"
]

# Compile regex patterns for exact whole word matches
regex_patterns = [(term, re.compile(rf'\b{re.escape(term)}\b')) for term in search_terms]

# Define the file extensions to search for
file_extensions = ('.ts', '.tsx', '.js', '.jsx', '.json')

# Define the folders to exclude
excluded_folders = {'.next', 'node_modules', '.git', '.ssh'}

# Output file settings
output_file_prefix = "consolidated_output"
output_file_extension = ".txt"
max_file_size = 150000  # 150K characters per file

def write_content(outfile, content, current_file_size):
    outfile.write(content)
    return current_file_size + len(content)

def search_in_files(root_folder):
    file_counter = 1
    current_file_size = 0
    outfile = None

    for root, dirs, files in os.walk(root_folder):
        dirs[:] = [d for d in dirs if d not in excluded_folders]

        for file in files:
            if file.endswith(file_extensions):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        for term, pattern in regex_patterns:
                            if pattern.search(content):
                                header = f"# File: {file_path}\n"
                                content_to_write = f"{header}{content}\n\n"
                                content_size = len(content_to_write)

                                # Handle oversized content by splitting
                                remaining_content = content_to_write
                                while remaining_content:
                                    if outfile is None:
                                        outfile = open(f"{output_file_prefix}_{file_counter}{output_file_extension}", 'w', encoding='utf-8')
                                    
                                    available_space = max_file_size - current_file_size
                                    chunk = remaining_content[:available_space]
                                    remaining_content = remaining_content[available_space:]

                                    current_file_size = write_content(outfile, chunk, current_file_size)

                                    if current_file_size >= max_file_size:
                                        outfile.close()
                                        file_counter += 1
                                        current_file_size = 0
                                        outfile = None

                                print(f"Found '{term}' in: {file_path}")
                                break  # Stop after first match
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")

    if outfile:
        outfile.close()

    print(f"Consolidated content written to {output_file_prefix}_*.txt files")

# Specify the main folder path
main_folder = '.'  # Current directory
search_in_files(main_folder)