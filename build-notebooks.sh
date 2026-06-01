#!/bin/bash
# Stop on any error
set -e

echo "========================================================="
echo "Jupyter Notebook Build & Optimization Pipeline"
echo "========================================================="

# Detect jupyter executable, defaulting to the custom micromamba env
JUPYTER="/home/olivier/micromamba/envs/wa/bin/jupyter"
if [ ! -f "$JUPYTER" ]; then
    echo "Custom environment jupyter not found. Falling back to system jupyter."
    JUPYTER="jupyter"
else
    echo "Using jupyter from custom environment: $JUPYTER"
fi

# Create output directory
mkdir -p docs/public/notebooks

echo "Step 1: Exporting notebooks to static HTML in dark mode..."
# Convert all 3 notebooks to static HTML
"$JUPYTER" nbconvert --to html --theme=dark python/1-sympy-verification.ipynb --output-dir docs/public/notebooks
"$JUPYTER" nbconvert --to html --theme=dark python/2-lognormal-simulation.ipynb --output-dir docs/public/notebooks
"$JUPYTER" nbconvert --to html --theme=dark python/3-monte-carlo-pricing.ipynb --output-dir docs/public/notebooks

echo "Step 2: Stripping cell execution outputs from source files..."
# Clear outputs inplace to keep repository lightweight and git-clean
"$JUPYTER" nbconvert --ClearOutputPreprocessor.enabled=True --inplace python/1-sympy-verification.ipynb
"$JUPYTER" nbconvert --ClearOutputPreprocessor.enabled=True --inplace python/2-lognormal-simulation.ipynb
"$JUPYTER" nbconvert --ClearOutputPreprocessor.enabled=True --inplace python/3-monte-carlo-pricing.ipynb

echo "========================================================="
echo "Pipeline complete. All notebooks processed successfully."
echo "========================================================="
