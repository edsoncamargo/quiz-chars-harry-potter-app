import { View, StyleSheet, Text } from "react-native";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

interface TimerBarProps {
  initialTimerValue?: number;
  handleEndTimer: () => void;
  onPause?: () => void;
  onRestart?: () => void;
}

export const TimerBar = forwardRef((props: TimerBarProps, ref: any) => {
  const { initialTimerValue = 10, handleEndTimer } = props;
  const [timer, setTimer] = useState<number>(initialTimerValue);
  const [isPaused, setIsPaused] = useState(false);

  const decrementTimer = () => {
    setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | number | undefined;

    if (isPaused === false && timer >= 0)
      interval = setInterval(decrementTimer, 1000);
    if (timer <= 0) handleEndTimer();

    return () => clearInterval(interval);
  }, [isPaused, timer]);

  const handleTogglePause = () => {
    setIsPaused((prevIsPaused) => prevIsPaused === false);
  };

  const handlePause = () => {
    setIsPaused(() => true);
  };

  const handleUnpause = () => {
    setIsPaused(() => false);
  };

  const handleRestart = () => {
    handleUnpause();
    setTimer(initialTimerValue);
  };

  useImperativeHandle(ref, () => ({
    handlePause,
    handleUnpause,
    handleRestart,
  }));

  function getCurrentTimerPercentage() {
    return `${(timer / 10) * 100}%`;
  }

  return (
    <View className="w-auto">
      <LinearGradient
        colors={["#2D6EFC", "#222455"]}
        className="relative mb-3 h-[48] w-full flex-row items-center justify-center"
        style={styles.timerBar}
        start={[0, 0]}
        end={[1, 0]}
      >
        <View
          className={`absolute right-0 h-[48] w-full bg-tertiary`}
          style={{ width: getCurrentTimerPercentage() }}
        ></View>
        <Text className="text-bold text-xl text-neutral-1">{timer}</Text>

        <View className="absolute right-3">
          <Feather name="clock" color="#F0F7F4" size={20} />
        </View>
      </LinearGradient>
    </View>
  );
});

const styles = StyleSheet.create({
  timerBar: {
    borderColor: "#F0F7F4",
    borderWidth: 2,
    borderRadius: 32,
    overflow: "hidden",
  },
});
