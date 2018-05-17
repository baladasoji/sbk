#! /bin/bash
aws s3 cp www/ s3://www.shuttlers.dk/  --recursive
aws s3 cp practice-web/ s3://practice.shuttlers.dk/  --recursive
