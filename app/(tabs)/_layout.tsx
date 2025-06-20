import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/contexts/AuthContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "HOME",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "REGISTER",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.badge.plus" color={color} />
          ),
        }}
      />
      {user && (
        <Tabs.Screen
          name="onboarding"
          options={{
            title: "ONBOARDING",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      )}
      {user && (
        <Tabs.Screen
          name="todos"
          options={{
            title: "TODOS",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="checklist" color={color} />
            ),
          }}
        />
      )}
      {user && (
        <Tabs.Screen
          name="profile"
          options={{
            title: "PROFILE",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.circle" color={color} />
            ),
          }}
        />
      )}
    </Tabs>
  );
}
