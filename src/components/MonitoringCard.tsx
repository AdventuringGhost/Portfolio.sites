import React from "react";
import { Card } from "./ui/Card";
import { Activity } from "lucide-react";

type MonitoringItem = {
  title: string;
  description: string;
};

export const MonitoringCard = ({ item }: { item: MonitoringItem }) => {
  return (
    <Card className="p-6 h-full">
      <div className="flex items-start gap-4">
        <Activity className="w-6 h-6 text-sky-500 mt-1 flex-shrink-0" />
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      </div>
    </Card>
  );
};
