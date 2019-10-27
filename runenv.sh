#!/bin/bash
input=".env"
while IFS= read -r line
do
  export $line
#   echo "$line ${#line}"
done < "$input"