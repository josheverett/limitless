type InputButtonProps = {
  IconComponent: React.ComponentType;
};

// TODO: Not everything is a circle. Triggers, R3/L3, etc.
// TODO: Animated circle ring for chat view button where you
// hold down the button or whatever?
// Update: All shapes/sillohettes need to be drawn separately, only
// the inner icons (when used) like hamburger/share/etc. can be
// the usual material icons. I'm gonna start with simple css circles
// for now, but I might ultimately end up just doing a vector
// tracing from xbox screenshots.
export const InputButton = ({ IconComponent }: InputButtonProps) => {
  return (
    <div className="">
      <IconComponent />
    </div>
  );
};
