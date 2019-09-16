# NOTES

## How long did it take?

- It took me around 10 hours in total

## Overview

First I examined the test instructions to have a basic understanding of what the project is about. I tried the API endpoints to see what they provide exactly. Then I examined to design thoroughly and started to plan the structure of the application.

An interesting challenge came right at the beginning:
The next step was to start the apllciation before making any modifications. This already turned out to be a challenge which I had to spend some time on. I tried to run the app on Windows first. The start script would only start the server (with the API and watching the data) but not the react app. After being able to start them separately I eventually realised that the & operator works differently on Windows than on Linux - it does not run the two in parallel but waits for the first one to exit first. As I was planning to work on the project on a laptop with Ubuntu, this didn't cause much trouble later.

After this, I made some changes to the App component and started to implement new components gradually. I added a Header to the App and also a NewAppointmentPage - the latter which would not have been necessary as the project is a single-page one, but it still makes the code more structured for me. I created a UserInfo component to hold the user-related elements and a FormSection component for the Consultant Type, the Dat & Time and the Appointment Type sections which are similar in functionality. Each of the FormSections can contain SelectableButtons, another new component, that implements the selectable nature and the styling of the buttons.

I added the styles to a component after I created it, keeping in mind that it should give a great UX on mobile devices but scale to larger screens as well. I made some modifications to the styles after finishing up the components where the responsive aspect didn't seem good enough to me. One thing I spent some time on but eventually skipped was to find the font that the desing uses- eventually just decided to use Roboto. 

While I was implementing the components I added a couple of tests, but most of the test were added after the app was pretty much ready. I was focused on trying to add some meaningful ones testing most of the functionality of the components. I had a few challenges here which I decided to skip. I couldn't figure out how the coverage table was generated, it consistently displayed onely one test file for me and couldn't find an easy fix. I have some errors related to FontAwesome icons in the test terminal, which I didn't spend much time on since the icons worked on the UI perfectly. Lastly, I had trouble testing the error throws, my assersions didn't pass even though the errors were clearly thrown, so I eventually decided to skip this.

Continuing the project the next steps would be:
  - checking the app on real devices (I used the Chrome's device toolbar) and see if some modifications should be made to make the UI more responsive
  - spending some time to see if I can refactor the NewAppointmentPage component a bit, it holds a fair amount of functionality now
  - fix the error throw tests and the FontAwesome errors and see where I'm missing important tests

## General Feedback

I had a lot of fun working on this project. I like the design and the API you provided. The instructions were pretty brief, had to take some time on them to figure out what I actually had to do. This can be a challenge in itself, but I think a bit more description could be very useful here and there. 