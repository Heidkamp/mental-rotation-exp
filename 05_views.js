// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = magpieViews.view_generator("intro", {
  trials: 1,
  name: 'intro',
  // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
  title: 'A quick experiment',
  text: `This is a mental rotation experiment.
            <br />
            <br />
            Please do this experiment in a calm environment so you can focus fully on the tasks.
            <br />
            <br />
            The experiment takes about 5 Minutes. Thank you for your participation!`,
  buttonText: 'See Instructions'
});

// For most tasks, you need instructions views
const instructions = magpieViews.view_generator("instructions", {
  trials: 1,
  name: 'instructions',
  title: 'General Instructions',
  text: `In the following you will see pictures of threedimensional shape pairs and have to decide whether they are same or different.
            <br />
            <br />
            We will start with a practice before the real experiment begins.  Be ready to either press the 'f' or 'j' key on your keyboard.`,
  buttonText: 'Start practice',
});

//Between practice and serious trials
const trials_start = magpieViews.view_generator("begin", {
  trials: 1,
  name: 'trials_start',
  title: 'Practice completed!',
  text: `Now that you got a hang of how things work, let's start with the trials.`,
  buttonText: 'Start the experiment',
  pause: 500
});


// In the post test questionnaire you can ask your participants addtional questions
const post_test = magpieViews.view_generator("post_test", {
  trials: 1,
  name: 'post_test',
  title: 'Additional information',
  text: 'Answering the following questions is optional..'

  // You can change much of what appears here, e.g., to present it in a different language, as follows:
  // buttonText: 'Weiter',
  // age_question: 'Alter',
  // gender_question: 'Geschlecht',
  // gender_male: 'männlich',
  // gender_female: 'weiblich',
  // gender_other: 'divers',
  // edu_question: 'Höchster Bildungsabschluss',
  // edu_graduated_high_school: 'Abitur',
  // edu_graduated_college: 'Hochschulabschluss',
  // edu_higher_degree: 'Universitärer Abschluss',
  // languages_question: 'Muttersprache',
  // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
  // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = magpieViews.view_generator("thanks", {
  trials: 1,
  name: 'thanks',
  title: 'Thank you for taking part in this experiment!',
  prolificConfirmText: 'Press the button'
});

/** trial (magpie's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _magpie (e.g. for use with a progress bar)
            and the name of the trial as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
      More about trial life cycle - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

    - hook: object - option to hook and add custom functions to the view
      More about hooks - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

* All about the properties of trial views
* https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#trial-views
*/


// Here, we initialize a normal forced_choice view
const rotations_trials = magpieViews.view_generator("key_press", {
  // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
  trials: 48,
  // name should be identical to the variable name
  name: 'rotations_trials',
  data: _.shuffle(trial_info.key_press),
  pause: 250,
  // you can add custom functions at different stages through a view's life cycle
  // hook: {
  //     after_response_enabled: check_response
  // }
});


//Practice:
const rotations_practice = magpieViews.view_generator("key_press", {
  // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
  trials: 12,
  // name should be identical to the variable name
  name: 'rotations_practice',
  data: _.shuffle(practice_info.key_press),
  pause: 250,

  //Feedback: Does not work, probably needs costum view
  hook: {
       after_response_enabled: check_response
  }
  // you can add custom functions at different stages through a view's life cycle
  // hook: {
  //     after_response_enabled: check_response
  // }
});

// There are many more templates available:
// forced_choice, slider_rating, dropdown_choice, testbox_input, rating_scale, image_selection, sentence_choice,
// key_press, self_paced_reading and self_paced_reading_rating_scale
