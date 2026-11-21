import {
Users,
UserPlus,
MessageCircle,
CheckCircle,
XCircle,
TrendingUp,
ArrowUpRight,
} from "lucide-react";

function Dashboard({ stats }) {
const cards = [
{
title: "Total Leads",
value: stats.total || 0,
icon: Users,
className: "purple",
description: "All potential customers",
},
{
title: "New Leads",
value: stats.new || 0,
icon: UserPlus,
className: "blue",
description: "Recently added leads",
},
{
title: "Contacted",
value: stats.contacted || 0,
icon: MessageCircle,
className: "orange",
description: "Leads you have reached",
},
{
title: "Qualified",
value: stats.qualified || 0,
icon: CheckCircle,
className: "green",
description: "High potential customers",
},
{
title: "Lost",
value: stats.lost || 0,
icon: XCircle,
className: "red",
description: "Unconverted leads",
},
];

return (
<div className="stats-grid">
{cards.map((card, index) => {
const Icon = card.icon;

    return (
      <div
        className={`stat-card stat-${card.className}`}
        key={card.title}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="stat-card-top">
          <div className={`stat-icon ${card.className}`}>
            <Icon size={22} strokeWidth={2.2} />
          </div>

          <span className="stat-indicator">
            <ArrowUpRight size={15} />
          </span>
        </div>

        <div className="stat-details">
          <p>{card.title}</p>
          <h2>{Number(card.value).toLocaleString("en-IN")}</h2>
          <span className="stat-description">
            {card.description}
          </span>
        </div>

        <div className="stat-decoration"></div>
      </div>
    );
  })}
</div>

);
}

export default Dashboard;