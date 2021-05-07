import React, { useState } from "react";
import Card from "./Card";

const Stack = ({ children, onVote, ...props }) => {
  const [stack, setStack] = useState(React.Children.toArray(children));

  const pop = (array) => {
    return array.filter((_, index) => {
      return index < array.length - 1;
    });
  };

  const handleVote = (item, vote) => {
    // update the stack
    let newStack = pop(stack);
    setStack(newStack);

    // run function from onVote prop, passing the current item and value of vote
    onVote(item, vote);
  };

  return (
    <>
      <div {...props}>
        {stack.map((item, index) => {
          let isTop = index === stack.length - 1;
          return (
            <Card
              drag={isTop}
              key={item.key || index}
              onVote={(result) => handleVote(item, result)}
              {...item.props}
            >
              {item}
            </Card>
          );
        })}
      </div>
    </>
  );
};
export default Stack;
