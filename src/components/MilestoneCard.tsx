import React from "react";
import { Card } from "./ui/Card";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "./ui/Badge";
import type { Milestone } from "@/content/types";

const statusVariantMap: Record<string, "success" | "default"> = {
  Complete: "success",
};

export const MilestoneCard = ({ milestone }: { milestone: Milestone }) => {
  const variant = statusVariantMap[milestone.status] || "default";

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{milestone.label}</h3>
        <Badge variant={variant} className="mt-2 sm:mt-0">
          {milestone.status}
        </Badge>
      </div>
      <p className="text-gray-600 mb-6">{milestone.summary}</p>

      {Array.isArray(milestone.tickets) && milestone.tickets.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">Key Tasks Completed</h4>
          <ul className="space-y-5 mt-3">
            {milestone.tickets.map((ticket) => (
              <li
                key={`${milestone.id}-${ticket.key}`}
                className="flex items-start gap-4"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{ticket.title}</p>
                  {ticket.finishingComment && (
                    <p className="mt-2 pl-4 border-l-2 border-gray-200 text-sm text-gray-600 italic">
                      {ticket.finishingComment}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};
