# Houndville

## It's a dogs life...

This is a demonstration of how to organize a scene-based game in React. This question arose with a student at [codebar.io](https://codebar.io/), and the example was a bit long to develop with the student at the time.

Here are the key features I'm attempting to demonstrate:
- Using react markup to create scenes that can have flexible behaviour and look
- Showing how to share common bits of functionality
- Using react router to switch between scenes
- Add a simple scoring facility
- Keep bits of technical dooberyness out of the way as much as possible
- To show that I am not a good artist!

This is based on [create-react-app](https://github.com/facebook/create-react-app) ([instructions on using this](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md)).

This is an intermediate-level demonstration. I assume total familiarity with HTML, CSS, JS, styled components, and some familiarity with React.

This is not just a learning exercise for the student, a teacher always learns things too. I used this as an opportunity to learn about styled components and how to make React clean and get closer to the presentational domain language.

## Quick setup

Install node (tested on v10)
```
npm install
npm start
```

# The Game

The game is comprised of scenes that tell a small part of the story through text boxes that appear. Clicking anywhere on the screen moves through the story. Occasionally questions are asked before you can continue, which I will use to score and unlock the next scene.

# Guide to Demonstration

## Scene and Subscene Setup

Let's look at the [code for the valley scene](https://github.com/kodikos/houndville/blob/master/src/ValleyScene/index.js) to begin with.
```
export default class ValleyScene extends StoryScene {
```
I'm extending a class [StoryScene](https://github.com/kodikos/houndville/blob/master/src/shared/StoryScene.js) for the component scene. This allows me to set up scenes that potentially behave differently, and hide some of the technical code for implementing it. I'm defining a StoryScene for scenes where you *mostly* progress through some sub-scenes. It defines a few things for me to keep this component implementation-free. This means that it is easier to describe what we want to do in this component, set up a narrative scene.

Our render() method contains the following tag structure:
```
<SceneWrapper>
    <Background />
    <this.SubScene name="init">
        <TextBox>
            Narrative text
        </TextBox>
    </this.SubScene>

    <this.SubScene name="tantalizing">
    ...
    </this.SubScene>
</SceneWrapper>
```
This allows us to declare the actual story. It sets up a backdrop image, then provides the things we want in each step of our narrative for this scene. In this case, I've defined a standard text box that I can use for displaying the text quickly. I still have the flexibility to define things differently, for example, moving the text box in each sub scene to mix it up and make the narrative more interesting.

To move between the sub-scenes, we need some logic. I've set up a method in StoryScene that we can add to do this:
```
decideNextSubScene(currentScene) {
    switch(currentScene) {
        //  ...
        default: return 'init';
    }
}
```
This is a very simple logic at present, but it gives us the flexibility to write more complex logic if we need.

So, a little more technically, how is it enabling this clarity? The magic is in [StoryScene](https://github.com/kodikos/houndville/blob/master/src/shared/StoryScene.js). This class acts as a tracker for which sub scene is currently on display by storing it in its' state. It checks which is currently set and only displays that sub scene. It also sets up the event on the scene wrapper to trap the click actions and call the `decideNextSubScene()` for you. 
