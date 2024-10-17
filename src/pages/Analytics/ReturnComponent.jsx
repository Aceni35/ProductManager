import Analytics from "./Analytics";
import Calendar from "./Calendar";
import Receipts from "./Receipts";

const ReturnComponent = ({ selected }) => {
  if (selected === "Calendar") {
    return <Calendar />;
  } else if (selected === "Analytics") {
    return <Analytics />;
  } else {
    return <Receipts />;
  }
};

export default ReturnComponent;
