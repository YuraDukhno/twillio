import React, { useState } from "react";
import { Alert } from "@twilio-paste/core/alert";
import { Theme } from "@twilio-paste/core/theme";
import { Text } from "@twilio-paste/core/text";
import { Box } from "@twilio-paste/core/box";
import { Card } from "@twilio-paste/core/card";
import { Button } from "@twilio-paste/core/button";
import { Stack } from "@twilio-paste/core/stack";
import { CloseIcon } from "@twilio-paste/icons/esm/CloseIcon";

const CustomTaskList = ({ tasks }) => {
  const [dismissedTasks, setDismissedTasks] = useState(new Set());

  // Check if there are any tasks that are not dismissed
  const taskArray = Array.from(tasks.values());
  const hasTasks = taskArray.some((task) => !dismissedTasks.has(task.sid));
  const hasMoreThenOneTask = taskArray.length > 1;
  // Dismiss the task by adding its SID to the dismissedTasks set
  const dismiss = (taskSid) => {
    setDismissedTasks(new Set(dismissedTasks).add(taskSid));
  };

  return (
    <Theme.Provider theme="default">
      <Box>
        {hasTasks && (
          <Stack orientation="vertical" spacing="space60">
            {taskArray.map(
              (task) =>
                !dismissedTasks.has(task.sid) && (
                  <Card key={task.sid} padding="space70" boxShadow="shadowCard">
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text
                        color="colorTextNeutral"
                        fontSize="1.5rem"
                        as="h3"
                      >{`You have ${taskArray.length} active task${hasMoreThenOneTask ? 's' : ''}.`}
                      </Text>
                      <Button
                        variant="destructive_secondary"
                        onClick={() => dismiss(task.sid)}
                      >
                        <CloseIcon decorative={false} title="Dismiss task" />
                      </Button>
                    </Box>
                  </Card>
                )
            )}
          </Stack>
        )}
        {/* {taskArray &&
          taskArray.map(({ sid }) => (
            <Stack orientation="vertical" spacing="space60">
              <Card>

              </Card>
            </Stack>
          ))} */}
      </Box>
    </Theme.Provider>
  );
};

export default CustomTaskList;
