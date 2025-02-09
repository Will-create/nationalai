# NationalAI: Moore-French Machine Translation Resources

Welcome to **NationalAI**, a repository dedicated to the creation and training of machine translation models between **Moore** (a language spoken in Burkina Faso) and **French**. This repository houses a collection of scripts, resource files, and datasets that were used to build and train translation models, specifically leveraging the **Transformer** architecture. It also includes **Colab notebooks** to facilitate easy experimentation with both training and inference.

**Live Demo :** [Coming soon]()

---

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Using the Transformer Model](#using-the-transformer-model)
5. [Contributing](#contributing)
6. [License](#license)

---

## Overview

This repository serves as a resource hub for developing **Moore-French** and **French-Moore** machine translation datasets and models. It provides:

- Scripts for **scraping** and **processing** linguistic resources.
- A collection of **datasets** in multiple formats (Parquet, JSON, TXT).
- An implementation of the **Transformer** architecture for machine translation.
- **Colab notebooks** for simplified training and inference.
- A **live demo** for real-time translation between Moore and French.

> **Note:** This repository is a collection of scripts and resources. It does not represent a fully-fledged application with features but is designed to be modular and adaptable for different translation tasks.

---

## Project Structure

Here’s an overview of the key directories and files:

- **`output/`**: Contains generated datasets, lexicons, and translation files in various formats (Parquet, JSON).
- **`scrapers/`**: Includes scripts for scraping data from various linguistic resources like `webonary.org` and `raamde-bf.net`. It also contains tools for data processing and formatting.
  - **`documents/`**: Raw source documents in Moore.
  - **`parquets/`**: Python scripts for converting JSON to Parquet and preparing data for training.
  - **`resources/`**: Contains resource files for Moore and French.
- **`transformers/`**: The implementation of the Transformer model with training and inference scripts.
  - **`Colab_Train.ipynb`**: Google Colab notebook for training.
  - **`inference.ipynb`**: Google Colab notebook for testing the model on new sentences.
  - **`model.py`**: The core Transformer model implementation.
  - **`train.py`**: Training script for the Transformer model.
  - **`translate.py`**: Script for performing translation inference.
- **`demo/`**: The source code for the live demo application, allowing users to translate between Moore and French in real-time.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Python 3.8+**
- **Node.js** (for running JavaScript scrapers)
- **pip** (Python package installer)

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Install Node.js dependencies:

```bash
npm install
```

### Running Scrapers

To scrape data from different sources, use the provided npm scripts. For example:

```bash
# Scrape data from webonary.org
npm run webonary:index

# Scrape data from raamde-bf.net
npm run raamde-bf:index
```

For data processing and conversion:

```bash
# Convert JSON to Parquet
npm run parquet:fromjson

# Split dataset for training
npm run parquet:splitter
```

---

## Using the Transformer Model

The repository includes Colab notebooks to simplify the training and inference processes.

### Training the Model

1. Open **`transformers/Colab_Train.ipynb`** in Google Colab.
2. Follow the steps to upload your dataset and start the training process.
3. Adjust hyperparameters as needed for better performance.

Alternatively, you can train locally:

```bash
python transformers/train.py
```

### Performing Inference

For testing translations on new sentences:

1. Open **`transformers/inference.ipynb`** in Google Colab.
2. Load the trained model and test with custom sentences.

Or run the script locally:

```bash
python transformers/translate.py --input "Your Moore/French sentence here"
```

### Using the Live Demo

Experience real-time translation with our live demo:

1. Visit the [NationalAI Translation Tool](https://nationalai-translation-tool.vercel.app/).
2. Input your text in **Moore** or **French**.
3. Get instant translations using the trained Transformer model.

---

## Contributing

We welcome contributions to this project! Whether it’s improving scripts, adding new datasets, refining the translation models, or enhancing the live demo, your help is appreciated.

### How to Contribute

1. **Fork** the repository.
2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/nationalai.git
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Make your changes and **commit** them:
   ```bash
   git commit -m "Add your message here"
   ```
5. **Push** your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a **Pull Request** in the main repository.

### Contribution Guidelines

- Follow the existing **coding style** and **naming conventions**.
- Write **clear commit messages**.
- Include **documentation** for any new scripts or features.
- Test your changes thoroughly.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Inspired by the need to create accessible machine translation tools for **Moore** and **French**.
- Thanks to the contributors and linguistic communities supporting open-source translation projects.
