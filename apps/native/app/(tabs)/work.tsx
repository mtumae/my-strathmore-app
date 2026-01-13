import { Container } from "@/components/container";
import { Text, View, ScrollView, Pressable, Alert } from "react-native";
import { Card, Popover, Surface, useThemeColor } from "heroui-native";
import { useState } from "react";
import { useColorScheme } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@my-strathmore-app/backend/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface Coursework {
  title: string;
  grade: string;
}

  // Each unit within a course
interface Unit {
  title?: string;
  lecturer?: string;
  coursework?: Coursework[];
  examMark?: number;
}

// Each course containing multiple units
interface Course {
  courseId?: string; // e.g., "BICS1.1"
  units: Unit[];
}

// The root user schema
interface UserData {
  clerkId?: string;
  courses: Course[];
}

const dummyCourseDetails = [
  {
    courseId: "BICS1.1",
    units: [
      {
        coursework: [
          { grade: "A", title: "Lab 1: Syntax" },
          { grade: "B+", title: "Midterm Exam" },
        ],
        lecturer: "Dr. Alice Smith",
        title: "Introduction to Programming",
        examMark: 88,
      },
      {
        coursework: [{ grade: "A-", title: "Assignment 1" }],
        lecturer: "Prof. Robert Brown",
        title: "Discrete Mathematics",
        examMark: 92,
      },
      {
        coursework: [{ grade: "A", title: "SQL Project" }],
        lecturer: "Dr. Carol White",
        title: "Database Systems",
        examMark: 85,
      },
      {
        lecturer: "Ms. Jane Doe",
        title: "Communication Skills",
         examMark: 85,
    
      },
      {
        lecturer: "Dr. Kevin Lee",
        title: "Computer Architecture",
         examMark: 85,

      },
      {
        lecturer: "Prof. Sarah Cook",
        title: "Operating Systems",
         examMark: 85,
      },
      {
        lecturer: "Dr. Mark Wood",
        title: "Ethics in Tech",
         examMark: 85,
      },
    ],
  },
  {
    courseId: "BICS1.2",
    units: [
      {
        coursework: [{ grade: "B", title: "Sorting Algorithm Task" }],
        lecturer: "Dr. Alice Smith",
        title: "Data Structures & Algorithms",
         examMark: 85,
      },
      {
        coursework: [{ grade: "A", title: "Packet Tracer Lab" }],
        lecturer: "Mr. Tom Harris",
        title: "Network Fundamentals",
         examMark: 85,
      },
    ],
  },
];

export default function Home() {
  const themeColorBackground = useThemeColor("background");
  const colorscheme = useColorScheme();
  const userSession = useUser();
  const [activeId, setActiveId] = useState("BICS1.1");
  const userData = useQuery(api.users.getById, { clerkId: userSession.user?.id });

  const [activeCourseDetails, setActiveCourseDetails] = useState<Course[]|undefined>(
    userData?.[0].courses ?? []
  );


  function fetchCourseDetails(id: string) {
    if(!userData) return;
    setActiveId(id);
    const details = userData?.[0].courses?.filter((course) => course.courseId === id) ?? [];
    setActiveCourseDetails(details);
  }

  return (
    <SafeAreaProvider
      className="gap-0"
      style={{ backgroundColor: themeColorBackground }}
    >
      <View>
        <ScrollView horizontal className="mt-18">
          {userData?.[0].courses?.map((c) => (
            <View key={c.courseId} className="">
              <Pressable
                onPress={() => fetchCourseDetails(c.courseId ?? "")}
                className={`${activeId === c.courseId ? "bg-secondary text-white" : ""}  gap-2 rounded-full transition-all duration-300 p-4`}
              >
                <Text
                  style={{ fontFamily: "Sansation_400Regular" }}
                  className={`${activeId === c.courseId ? "text-white" : "text-foreground"}`}
                >
                  {c.courseId}
                </Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
      <ScrollView className="flex-3 gap-5 ">
        {activeCourseDetails?.length === 0 ?
        <Text className="text-foreground text-center ">No course details currently available.</Text>
        :
        activeCourseDetails?.map((course) => (
            <View key={course.courseId} className="p-8 w-full ">
              <Text className="text-muted text-2xl p-3">{course.courseId}</Text>
              <View className="mt-4 flex gap-10">
                {course.units?.map((cw, index) => (
                  <View
                    key={index}
                    className={`${colorscheme=== "dark" ? "bg-[#242121]" : "bg-[#e0e0e0]"} w-auto text-left rounded-3xl p-10 `}
                  >
                    <View className="flex-row justify-between gap-4">
                      <View>
                        <Text className="text-foreground text-lg">
                          {cw?.title}
                        </Text>
                        <Text className="text-secondary text-sm">
                          {cw?.lecturer}
                        </Text>
                      </View>
                      <Text className="text-secondary text-4xl">
                        {`${cw.examMark ?? "N/A"}`}
                      </Text>
                    </View>
                    <View className="p-3">
                      {cw.coursework?.map((w, wIndex) => (
                        <View
                          key={wIndex}
                          className="flex-row justify-between mt-1"
                        >
                          <Text className="text-foreground text-sm">
                            {w.title}
                          </Text>
                          <Text className="text-foreground text-sm">
                            {w.grade ?? "N/A"}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaProvider>
  );
}
