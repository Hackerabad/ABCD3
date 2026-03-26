# 🚀 Gen AI & Agents: Session Setup Guide

Welcome to the session! To make sure we can dive straight into building and experimenting with Large Language Models and AI Agents, please follow these quick setup instructions before we begin.

We will be using **`uv`**, an incredibly fast Python package manager, to handle our environment and dependencies. 

## Step 1: Install `uv`
If you don't have `uv` installed yet, open your terminal (or Command Prompt/PowerShell on Windows) and install it using pip:
```bash
pip install uv
```

## Step 2: Get the Code & Navigate
Next, let's grab the session files from GitHub and move into the correct project folder. Run these commands one after the other:
```bash
git clone [https://github.com/Hackerabad/ABCD3.git](https://github.com/Hackerabad/ABCD3.git)
cd ABCD3/agent_space
```

## Step 3: Launch Jupyter Lab
Once you are inside the `agent_space` folder, you can fire up the Jupyter environment directly through `uv`. This ensures all the required packages for our session are handled properly without you needing to set up a complex virtual environment manually.

Run the following command:
```bash
uv run jupyter lab
```

This will automatically open a new tab in your default web browser. Just click on the session's `.ipynb` file to open the deck, and you are ready to go!