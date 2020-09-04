#!/usr/bin/python
# Copyright 2010 Google Inc.
# Licensed under the Apache License, Version 2.0
# http://www.apache.org/licenses/LICENSE-2.0

# Google's Python Class
# http://code.google.com/edu/languages/google-python-class/

# Modified by Alchan Kim at SNU Software Platform Lab for
# SWPP fall 2020 lecture.

import sys
import re
import os

from functools import wraps

"""Baby Names exercise

Implement the babyname parser class that parses the popular names and their ranks from a html file.

1) At first, you need to implement a decorator that checks whether the html file exists or not.
2) Also, the parser should extract tuples of (rank, male-name, female-name) from the file by using regex. 
   For writing regex, it's nice to include a copy of the target text for inspiration.
3) Finally, you need to implement `parse` method in `BabynameParser` class that parses the extracted tuples
   with the given lambda and return a list of processed results.
"""


class BabynameFileNotFoundException(Exception):
    """
    A custom exception for the cases that the babyname file does not exist.
    """
    pass



def check_filename_existence(func):
    """
    (1 point)
    A decorator that catches the non-exiting filename argument and raises a custom `BabynameFileNotFoundException`.

    Args:
        func: The function to decorate.
    Raises:
        BabynameFileNotFoundException: if there is no such file named as the first argument of the function to decorate.
    """
    # TODO: Implement this decorator


class BabynameParser:

    @check_filename_existence
    def __init__(self, dirname, year):
        """
        (3 points)
        Given a file name for `{year}.html`, extracts the year of the file and
        a list of the (rank, male-name, female-name) tuples from the file by using regex.
        [('1', 'Michael', 'Jessica'), ('2', 'Christopher', 'Ashley'), ....]

        Args:
            dirname: The name of the directory where baby name html files are stored
            year: The year number. int.
        """

        text = "TODO" # TODO: Open and read html file of the corresponding year, and assign the content to `text`. 

        # TODO: Implement the tuple extracting code.
        # `self.rank_to_names_tuples` should be a list of tuples of ("rank", "male name", "female name").
        # You can process the file line-by-line, but regex on the whole text at once is even easier.
        # (If you resolve the previous TODO, the html content is saved in `text`.)
        # You may find the following method useful: `re.findall`.
        # See https://docs.python.org/3/library/re.html#re.findall.
        self.rank_to_names_tuples = [("1", "TODO_male", "TODO_female"), ("2", "TODO_male", "TODO_female")]
    
    def parse(self, parsing_lambda):
        """
        (2 points)
        Collects a list of babynames parsed from the (rank, male-name, female-name) tuples.
        The list must contains all results processed with the given lambda.

        Args:
            parsing_lambda: The parsing lambda.
                            It must process an single (string, string, string) tuple and return something.
        Returns:
            A list of `BabyRecord` objects. (`BabyRecord` class is defined in `run.py`.)
        """
        # TODO: Implement this method
