import os

# Define the root directory of your project
ROOT_DIR = r"C:\Users\hanos\nextall"

# Define folders to exclude
EXCLUDE_FOLDERS = {"node_modules", ".next", ".git"}

# Define the output file
OUTPUT_FILE = "project_structure.txt"

# Define the key files to include their content (updated for merged structure)
KEY_FILES = {
    "backend": ["jsconfig.json"],
    "frontend": ["jsconfig.json", "next.config.js"],
    "root": ["server.js", "package.json", ".env"] 
}

# Updated Tech Stack description
TECH_STACK = """
Tech Stack Used in the Project

Frontend
Framework: Next.js (React-based framework with SSR/SSG support)

UI Library: Material-UI (MUI) with custom theme configuration

State Management: Redux Toolkit with Redux Persist

Form Handling: Formik with Yup validation

Animation: Framer Motion

Routing: Next.js App Router (File-based routing)

Styling: Emotion (CSS-in-JS)

Payment Integration:
- Stripe (React Stripe.js)
- PayPal (React PayPal JS)

Charts: ApexCharts (React ApexCharts)

PDF Generation: @react-pdf/renderer

Internationalization: FormatJS (Intl)

Toast Notifications: React Hot Toast

Icons: React Icons

Progress Bar: Next NProgress Bar

File Upload: React Dropzone

Backend
Runtime: Node.js

Framework: Express.js

Database: MongoDB (with Mongoose ODM)

Authentication: JSON Web Tokens (JWT)

File Storage: Cloudflare R2 (S3-compatible)

Email Service: Postmark (with Nodemailer)

Payment Processing: Stripe (Server-side)

Cron Jobs: Node Cron

Validation: Express Validator

File Upload: Multer

Security: Bcrypt (Password Hashing), CORS, Helmet (via Express)

Database
Primary Database: MongoDB (NoSQL)

Models:
- User (Admin, Vendor, Customer roles)
- Product
- Order
- Category
- Brand
- Coupon Codes
- Payment Intents
- Reviews
- Wishlist
- Newsletter Subscriptions

DevOps & Tools
Environment Management: Dotenv

Linting: ESLint (with Prettier integration)

Package Manager: npm

Build Tool: Webpack (via Next.js)

"""

def should_exclude(path):
    """Check if the path should be excluded based on EXCLUDE_FOLDERS."""
    for folder in EXCLUDE_FOLDERS:
        if folder in path.split(os.sep):
            return True
    return False

def get_file_content(file_path):
    """Read and return the content of a file."""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        return f"Error reading file {file_path}: {e}"

def generate_project_structure():
    """Generate the project structure and write it to the output file."""
    with open(OUTPUT_FILE, "w", encoding="utf-8") as output_file:
        # Write the tech stack
        output_file.write(TECH_STACK + "\n\n")

        # Write the root folder description
        output_file.write("Root Folder: C:\\Users\\hanos\\nextall\n")
        output_file.write("This folder contains the 'backend' and 'frontend' folders.\n\n")

        # Walk through the project directory
        for root, dirs, files in os.walk(ROOT_DIR):
            if should_exclude(root):
                continue

            # Write the directory path
            output_file.write(f"Directory: {root}\n")

            # Write the files in the directory
            for file in files:
                file_path = os.path.join(root, file)
                output_file.write(f"{file_path}\n")

            output_file.write("\n")

        # Append the content of key files
        output_file.write("\n\n### Key Files Content\n")

        # Include root-level key files
        output_file.write("\n#### Root Key Files\n")
        for file in KEY_FILES["root"]:
            file_path = os.path.join(ROOT_DIR, file)
            output_file.write(f"\n**{file}**\n")
            output_file.write(get_file_content(file_path) + "\n")

        # Include backend and frontend key files
        for folder, files in KEY_FILES.items():
            if folder == "root":
                continue  # Skip root, already handled above
            output_file.write(f"\n#### {folder.capitalize()} Key Files\n")
            for file in files:
                file_path = os.path.join(ROOT_DIR, folder, file)
                output_file.write(f"\n**{file}**\n")
                output_file.write(get_file_content(file_path) + "\n")

        # Append the additional text at the end
        output_file.write("\n\nI am not a programmer, and I need your help in solving some issues I am facing when running the site on the local server. Therefore, you need to find the causes of the problems I describe to you in this conversation and provide the easiest solution. You should also identify the files that you think can help in diagnosing the issue by examining their content. So, initially, I need you to list the names of the files. In the next response, I will send you the content of those files for you to analyze, identify the source of the problem, and solve it.\n")

if __name__ == "__main__":
    generate_project_structure()
    print(f"Project structure and details written to {OUTPUT_FILE}")