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

Currently hosting at: https://kodikos.github.io/houndville

The game is comprised of scenes that tell a small part of the story through text boxes that appear. Clicking anywhere on the screen moves through the story. Occasionally questions are asked before you can continue, which I will use to score and unlock the next scene.

# Guide to Demonstration

## Scene and Subscene Setup

This section explains my PR on [creating a scene](https://github.com/kodikos/houndville/pull/1).

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

## Quizzes

This section explains my PR on [adding a quiz](https://github.com/kodikos/houndville/pull/2).

What's the fun of a game if it isn't interactive? 

The Quiz works by acting like a decision tree for the next sub-scene to move to. It sets out the question, then when an answer is given, it moves it to a sub-scene that contains the result.

It introduces a slightly tricky scenario in hiding the mechanics. Ideally, you want each answer to have an onclick that will perform the action of moving to the next sub-scene. But, in trying to hide it, we lose the context for working with the sub-scene.

I have gone for minimizing the interaction by passing an event to the [Quiz](https://github.com/kodikos/houndville/blob/master/src/shared/Quiz.js) class. I use something close to magic in React to transform the child Choice components to add a reference to that event by creating my own onClick prop. React doesn't let you manipulate a child component, they are _immutable_. However, you can easily clone it and set up new props for it (here's a great post about working with [children in react](https://frontarm.com/james-k-nelson/passing-data-props-children/)). This is handled in the rendering of the Quiz component. Back in my scene, I just need to invoke it to change the sub-scene when that event is called.

Something extra that I have to do is disable event bubbling. This is because I listen for clicks anywhere in the scene, and the buttons on the quiz are in the scene. I add the `e.stopPropagation()` to prevent the event being fired for the scene as well.

The quiz mechanism can potentially be used for introducing alternative story narratives and a choice of sub-scene. This is where the flexibility of the `decideNextSubScene()` comes in handy to manage this.

## Scenes

This section explains my PR on [creating multiple scenes](https://github.com/kodikos/houndville/pull/4).

A good way to organize the game is to have each of the scenes on a different URL. This can help with things like navigating through to different parts of a game.

This introduces the `react-router-dom` package, a.k.a React Router v4. If you look in the [main App class](https://github.com/kodikos/houndville/blob/master/src/App.js), you see the `HashRouter`, `Switch`, and `Route` classes being used. This simple set up allows us to define a component to sit on a URL (web address), the _exact_ keyword and `Switch` class help make it a specific URL. This is set out a lot like a web server that you might set up with Express, page routing is typically something that's only done by a web server.

We have to do something a little different from normal HTML to move around between scenes.. wait, what? A React app is not necessarily rendering a page, it's a javascript application that can be rendered on the server or in your browser, you may not even be aware which way it's doing it! When it's running from a browser, it doesn't need to go back to the server because it already has everything it needs. It uses URLs as a consistent way to refer to different parts of the app no matter which mode it's running in. Because of this it needs to abstract the way you use routing.

The two extra components provided for changing the URL are `Link` and `Redirect`. A `Link` component sets up a special anchor tag so that you can click on a link and it takes you elsewhere in the app. `Redirect` works a little differently, when it is rendered it will cause the app to go elsewhere in the app. It is normally within a conditional so that it appears when you need it to. You can see `Redirect` used in this app in the last subscene of the [valley scene](https://github.com/kodikos/houndville/blob/master/src/ValleyScene/index.js). The ChangeScene component defined in [StoryScene](https://github.com/kodikos/houndville/blob/master/src/shared/StoryScene.js) sets up a special type of SubScene so that when it switches from the `under-the-bridge` subscene to `next-scene` it renders the `Redirect` component and causes the switch to the entrance scene.

Of note, something I found while setting up the scenes is that with hosting this on github pages, it's easiest to use `HashRouter`, whereas on deployment to my own domain, I would be better off using `BrowserRouter`. This is because `BrowserRouter` manipulates the _path_ part of a URL, and the nature of github routing forces you to have a specific path. Whereas you could incorporate this into your addressing schemes, there are other gotchas associated with this approach. So, for this demo I'm taking the easier option of using `HashRouter` which allows my code to be virtually the same with just a class name change. But what it does is manipulate the _fragment_ part of the URL instead, the bit after the hash, which refers to a part of the page.

## Scoring

This section explains my PR on [scoring](https://github.com/kodikos/houndville/pull/5).

As this game is essentially a story told in stages, the main scoring really just needs to track which stages you've been through. A counter would be sufficient, but I thought it might be a little more robust to know which stages the user had traversed. This would allow later modifications like variations in the story that go via different scenes. It would also prevent a simple hack like replaying a scene/question you'd already answered to accumulate more points!

As the scoring has to be kept across multiple scenes, we have to _hoist_ the state to the highest meaningful component, in this case [App](https://github.com/kodikos/houndville/blob/master/src/App.js). App by default in a `create-react-app` is just a function and unable to store state. So I converted this to a Component, and the scoring is initialised in the constructor to an empty array. I then add an event method to pass around that can modify the score when points have been won/stage completed.

In order to pass the score and event to update it, the routing has to be modified to use _render_ routing instead of _component_ routing. _render_ routing allows access to the props given to it by routing, and also the state within its' scope (in this case, App's). This is done in the `SceneRoute` component. It looks a little complex because it's doing a lot of things at once. We take the arguments given and immediately split off the `component` value. Jumping to the return, we are creating a new `Route` that's given all the props SceneRoute was given, but defines a render property, that's what gets done if this route is chosen. We return `<Component />` which was the value of the `component` value we stripped out the SceneRoute arguments. We then add some arguments of our own on to those passed through from the router. The `Component` is actually the scene we want to render. We can see this when we look at the declaration of a SceneRoute:
```
<SceneRoute exact path="/" component={ValleyScene} />
```
It still behaves much like a normal `Route`, but has actually created the `ValleyScene` component and given it some extra props.

Something else we do in SceneRoute is to add the lock so that users have to get the required point before continuing. If we add a `requires` prop to SceneRoute, this defines an _access control rule_. If you don't have the required token in the scoring it will disply a notice instead.

In the [valley scene](https://github.com/kodikos/houndville/blob/master/src/ValleyScene/index.js), we need to connect getting the right answer to scoring the point. This is done in the `handleQuizAnswer()` event by checking if it's marked as a correct answer (actually I'd already added the handling of the isCorrect flag in the quiz PR.. oops!). 

All that's left then is showing the user how many points they have. I added the ScoreBoard component for doing this.
