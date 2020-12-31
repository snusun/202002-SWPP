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
    def func_wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception:
            raise BabynameFileNotFoundException("No such file: {}/{}.html".format(args[1], args[2])) # note that format
    return func_wrapper

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
        self.year = year

        pathname = os.path.join(dirname, "{}.html".format(year)) # TODO: Open and read html file of the corresponding year, and assign the content to `text`. 
        with open(pathname) as f: 
            text = f.read()

        # TODO: Implement the tuple extracting code.
        # `self.rank_to_names_tuples` should be a list of tuples of ("rank", "male name", "female name").
        # You can process the file line-by-line, but regex on the whole text at once is even easier.
        # (If you resolve the previous TODO, the html content is saved in `text`.)
        # You may find the following method useful: `re.findall`.
        # See https://docs.python.org/3/library/re.html#re.findall.
        
        mylist = re.findall("<td>[0-9]+</td> <td>[a-zA-Z]+</td> <td>[a-zA-Z]+</td>", text)

        for i in range(len(mylist)):
            mylist[i] = mylist[i].split()
            for j in range(len(mylist[i])):
                mylist[i][j] = mylist[i][j].replace("<td>", "")
                mylist[i][j] = mylist[i][j].replace("</td>", "")
            mylist[i] = tuple(mylist[i])

        self.rank_to_names_tuples = mylist
    
    def parse(self, parsing_lambda):
        """
        (2 points)
        Collects a list of babynames parsed from the (rank, male-name, female-name) tuples.
        The list must contains all results processed with the given lambda.

        Args:
            parsing_lambda: The parsing lambda.
                            It must process an single (string, string, string) tuple and return something.
        Returns:
            A list of lambda function's output
        """
        # TODO: Implement this method
        return list(map(parsing_lambda, self.rank_to_names_tuples)) 
        #return list(map(lambda rank_to_names_tuple : rank_to_names_tuple[0], self.rank_to_names_tuples))