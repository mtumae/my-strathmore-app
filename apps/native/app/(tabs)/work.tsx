import { Container } from "@/components/container";
import { Text, View, ScrollView, Pressable } from "react-native";
import { Card, Popover, Surface, useThemeColor } from "heroui-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "@expo-google-fonts/sansation/useFonts";
import { Sansation_400Regular } from "@expo-google-fonts/sansation/400Regular";
import { useColorScheme } from "react-native";
interface Unit {
  id: number;
  title: string;
}

interface Work {
  title: string;
  score?: string;
}

interface CourseWork {
  unit: string;
  lecturer?: string;
  work: Work[];
  examMark?: number;
}

interface CourseDetails {
  title: string;
  id: number;
  courseWork: CourseWork[];
}
const dummyCourseDetails: CourseDetails[] = [
  {
    title: "BICS 1.1",
    id: 1,
    courseWork: [
      {
        unit: "Introduction to Programming",
        lecturer: "Lawrence Muriira",
        work: [
          { title: "CAT 1", score: "85%" },
          { title: "CAT 2", score: "88%" },
          { title: "Project", score: "90%" },
        ],
        examMark: 92,
      },
      {
        unit: "Unit 2",
        lecturer: "John",
        work: [
          { title: "CAT 1", score: "21/30" },
          { title: "CAT 2", score: "15/30" },
          { title: "Project", score: "40/60" },
        ],
        examMark: 72,
      },
      {
        unit: "Unit 3",
        lecturer: "Michael",
        work: [
          { title: "CAT 1", score: "78%" },
          { title: "CAT 2", score: "80%" },
          { title: "Project", score: "83%" },
        ],
        examMark: 62,
      },
    ],
  },
  {
    title: "BICS 1.2",
    id: 2,

    courseWork: [
      {
        unit: "Unit 1",
        lecturer: "Alice",
        work: [
          { title: "CAT 1", score: "8%" },
          { title: "CAT 2", score: "8%" },
          { title: "Project", score: "9%" },
        ],
        examMark: 62,
      },
      {
        unit: "Unit 2",
        lecturer: "David",
        work: [
          { title: "CAT 1", score: "50%" },
          { title: "CAT 2", score: "32%" },
          { title: "Project", score: "25%" },
        ],
        examMark: 62,
      },
      {
        unit: "Unit 3",
        lecturer: "Emma",
        work: [
          { title: "CAT 1", score: "88%" },
          { title: "CAT 2", score: "50%" },
          { title: "Project", score: "43%" },
        ],
        examMark: 62,
      },
    ],
  },
  // Add more course details as needed
];

const courses = [
  { title: "BICS 1.1", id: 1, description: "year 1 semester 1." },
  { title: "BICS 1.2", id: 2, description: "year 1 semester 2." },
  { title: "BICS 2.1", id: 3, description: "year 2 semester 1." },
  { title: "BICS 2.2", id: 4, description: "year 2 semester 2." },
  { title: "BICS 2.3", id: 5, description: "year 2 semester 2." },
  { title: "BICS 2.4", id: 6, description: "year 2 semester 2." },
  { title: "BICS 2.5", id: 7, description: "year 2 semester 2." },
];
export default function Home() {
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");
  const [activeId, setActiveId] = useState(1);
  const [courseDetails, setCourseDetails] = useState<CourseDetails[]>([
    dummyCourseDetails[0],
  ]);
  function fetchCourseDetails(id: number) {
    // Simulate fetching data (replace with actual data fetching logic)
    setActiveId(id);
    const details = dummyCourseDetails.filter((course) => course.id === id);
    setCourseDetails(details);
  }
  return (
    <Container className="flex ">
      <ScrollView horizontal className="flex-row gap-10 mt-18 px-1">
        {courses.map((c) => (
          <View key={c.id} className="overflow-x-scroll ">
            <Pressable
              onPress={() => fetchCourseDetails(c.id)}
              className={`${activeId === c.id ? "bg-secondary text-white" : ""}  gap-2 rounded-full transition-all duration-300 p-4`}
            >
              <Text
                style={{ fontFamily: "Sansation_400Regular" }}
                className={`${activeId === c.id ? "text-white" : "text-foreground"}`}
              >
                {c.title}
              </Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <View className="flex-3 items-center justify-center gap-5">
        {courseDetails.length > 0 ? (
          courseDetails.map((course) => (
            <View key={course.id} className="p-8 w-full ">
              <Text className="text-muted text-2xl p-3">{course.title}</Text>
              <View className="mt-4 flex gap-10">
                {course.courseWork.map((cw, index) => (
                  <View
                    key={index}
                    className={`${useColorScheme() === "dark" ? "bg-[#242121]" : "bg-[#e0e0e0]"} w-auto text-left rounded-3xl p-10 `}
                  >
                    <View className="flex-row justify-between gap-4">
                      <View>
                        <Text className="text-muted text-lg">{cw.unit}</Text>
                        <Text className="text-secondary text-sm">
                          {cw.lecturer}
                        </Text>
                      </View>
                      <Text className="text-secondary text-4xl">
                        {`${cw.examMark ?? "N/A"}`}
                      </Text>
                    </View>
                    <View className="p-3">
                      {cw.work.map((w, wIndex) => (
                        <View
                          key={wIndex}
                          className="flex-row justify-between mt-1"
                        >
                          <Text className="text-foreground text-sm">
                            {w.title}
                          </Text>
                          <Text className="text-muted text-sm">
                            {w.score ?? "N/A"}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View className="justify-center min-h-screen items-center flex-1">
            <Text className="text-foreground">
              Select a course to see details
            </Text>
          </View>
        )}
      </View>
    </Container>
  );
}
