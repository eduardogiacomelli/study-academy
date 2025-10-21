"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Minus } from "lucide-react";

interface ComparisonItem {
  name: string;
  features: {
    [key: string]: boolean | string | number;
  };
  color: string;
  winner?: boolean;
}

interface ComparisonTableProps {
  title: string;
  description?: string;
  items: ComparisonItem[];
  features: Array<{ key: string; label: string; }>;
}

export function ComparisonTable({ title, description, items, features }: ComparisonTableProps) {
  const renderValue = (value: boolean | string | number) => {
    if (typeof value === "boolean") {
      return value ? (
        <CheckCircle2 className="size-5 text-green-500 mx-auto" />
      ) : (
        <XCircle className="size-5 text-red-500 mx-auto" />
      );
    }
    if (value === "-" || value === "N/A") {
      return <Minus className="size-5 text-muted-foreground mx-auto" />;
    }
    return <span className="font-medium">{value}</span>;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-sm border">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left py-4 px-4 font-semibold text-foreground">
                Característica
              </th>
              {items.map((item, idx) => (
                <th key={idx} className="text-center py-4 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className={`w-full py-2 px-4 rounded-lg bg-gradient-to-br ${item.color} text-white font-semibold`}>
                      {item.name}
                    </div>
                    {item.winner && (
                      <Badge className="bg-yellow-500 text-white border-0">
                        🏆 Melhor
                      </Badge>
                    )}
                  </motion.div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, featureIdx) => (
              <motion.tr
                key={feature.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: featureIdx * 0.05 }}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="py-4 px-4 font-medium text-foreground">
                  {feature.label}
                </td>
                {items.map((item, itemIdx) => (
                  <td key={itemIdx} className="py-4 px-4 text-center text-muted-foreground">
                    {renderValue(item.features[feature.key])}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

