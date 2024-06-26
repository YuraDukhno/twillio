import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import CustomTaskList from './components/CustomTaskList/CustomTaskList';

const PLUGIN_NAME = 'TwilioTestPlugin';

export default class TwilioTestPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { Flex.Manager }
   */
  async init(flex, manager) {
    // Automatically accept and select tasks when a reservation is created
    manager.workerClient.on('reservationCreated', reservation => {
      flex.Actions.invokeAction('AcceptTask', { sid: reservation.sid });
      flex.Actions.invokeAction('SelectTask', { sid: reservation.sid });
    });

    // Listen for task completion events
    manager.events.addListener('taskCompleted', ({task}) => {
      const { from, to } = task['_task']?.attributes;

      const body = {
        to: from,
        from: to,
        body: 'Thank you for calling us',
      };

      const options = {
        method: 'POST',
        body: new URLSearchParams(body),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      };
    
      fetch('https://yuras-first-7376.twil.io/send_sms', options)
        .then((res) => res)
        .catch((err) => console.error(err));
    });

    // Add CustomTaskList component to the UI
    const options = { sortOrder: -1 };
    flex.AgentDesktopView.Panel1.Content.add(<CustomTaskList key="TwilioTestPlugin-component" />, options);
  }
}
