"use client"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { JSX } from "react/jsx-runtime"
import { useTheme } from "../../contexts/themeContext"
import { Header } from "@/shared/components/ui/header"
import { useState } from "react"
import { BsUpload } from "react-icons/bs";
import { MdOutlineRefresh } from "react-icons/md";
import { BiSupport } from "react-icons/bi";


type PerfPoint = { label: string; value: number }
type Activity = { title: string; subtitle: string; date: string; timeAgo: string }

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

const balance = 2687500
const ytd = 0.0969
const nav = 18.56

// Simple mocked data for charts (30 days)
const performanceData: PerfPoint[] = Array.from({ length: 30 }, (_, i) => {
  const base = 98
  const noise = Math.sin(i / 3) * 2 + Math.cos(i / 5) * 1.5
  const spike = i === 22 ? 3.2 : 0
  return { label: `${i + 1}`, value: Math.round((base + noise + spike) * 10) / 10 }
})

// Mocked monthly NAV data (30 days)
const navData: PerfPoint[] = Array.from({ length: 30 }, (_, i) => {
  const base = 97.2
  const noise = Math.sin(i / 2.5) * 2.4 + Math.cos(i / 6) * 1.1
  const lateLift = i > 26 ? (i - 26) * 1.2 : 0
  return { label: `${i + 1}`, value: Math.round((base + noise + lateLift) * 10) / 10 }
})

const activities: Activity[] = [
  { title: "Document Submitted", subtitle: "Investment Report Q3", date: "August 2025", timeAgo: "5 Hours ago" },
  { title: "Document Submitted", subtitle: "Investment Report Q3", date: "August 2025", timeAgo: "5 Hours ago" },
  { title: "Document Submitted", subtitle: "Investment Report Q3", date: "August 2025", timeAgo: "5 Hours ago" },
  { title: "Document Submitted", subtitle: "Investment Report Q3", date: "August 2025", timeAgo: "5 Hours ago" },
]

export default function CustomerDashboard(): JSX.Element {
  const { theme } = useTheme();
    const [selectedMonth, setSelectedMonth] = useState("June");

  const totalReturn = Math.round(balance * ytd)

  return (
    <section className="flex flex-col gap-[24px]">
      <Header title="Dashboard" subTitle="Overview" />
      <main
        className={`font-roboto bg-theme-${theme} text-color-${theme} min-h-screen`}
      >
        <div className="mx-auto p-6 md:p-8">
          {/* Top actions */}
          <header className="mb-4 flex flex-wrap items-center justify-end gap-6 md:mb-6">
            <nav
              aria-label="quick actions"
              className="flex items-center gap-6 text-color-activeAccounts-${theme}"
            >
              <button className="flex items-center text-[22px] font-roboto">
                <MdOutlineRefresh
                  className={`mr-2 text-color-stepper-completed-${theme} cursor-pointer`}
                  size={18}
                />
                Refresh Data
              </button>

              <button className="flex items-center text-[22px] font-roboto">
                <BsUpload
                  className={`mr-2 text-color-stepper-completed-${theme} cursor-pointer`}
                  size={18}
                />
                Export
              </button>

              <button className="flex items-center text-[22px] font-roboto">
                <BiSupport
                  className={`mr-2 text-color-stepper-completed-${theme} cursor-pointer`}
                  size={18}
                />
                Support
              </button>
            </nav>

            <button
              className={`rounded-lg border border-color-${theme} px-3 py-2 text-[20px] font-roboto text-color-${theme} hover:bg-color-selected-${theme}`}
              aria-label="Edit dashboard"
            >
              Edit Dashboard
            </button>
          </header>

          {/* Filters */}
          <section
            aria-label="Filters"
            className={`bg-transparent mb-6 grid grid-cols-4 gap-3`}
          >
            <div className="flex flex-col gap-1">
              <label
                className={`text-[14px] font-roboto text-color-muted-${theme}`}
                htmlFor="fund"
              >
                Fund
              </label>
              <select
                id="fund"
                className={`rounded-md border border-color-${theme} bg-color-inputField-${theme} p-2 text-[16px] font-roboto text-color-${theme}`}
              >
                <option>Demo Fund Test</option>
                <option>Global Equity Fund</option>
                <option>Balanced Income Fund</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                className={`text-[14px] font-roboto text-color-muted-${theme}`}
                htmlFor="class"
              >
                Class
              </label>
              <select
                id="class"
                className={`rounded-md border border-color-${theme} bg-color-inputField-${theme} p-2 text-[16px] font-roboto text-color-${theme}`}
              >
                <option>Class A</option>
                <option>Class B</option>
                <option>Class C</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                className={`text-[14px] font-roboto text-color-muted-${theme}`}
                htmlFor="account"
              >
                Account
              </label>
              <select
                id="account"
                className={`rounded-md border border-color-${theme} bg-color-inputField-${theme} p-2 text-[16px] font-roboto text-color-${theme}`}
              >
                <option>Maria Amin</option>
                <option>Alex Johnson</option>
                <option>Jordan Lee</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                className={`text-[14px] font-roboto text-color-muted-${theme}`}
                htmlFor="currency"
              >
                Currency
              </label>
              <select
                id="currency"
                className={`rounded-md border border-color-${theme} bg-color-inputField-${theme} p-2 text-[16px] font-roboto text-color-${theme}`}
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </section>

          {/* Balance banner */}
          <section
            className={`bg-color-card-gradient-${theme} rounded-xl  mb-6 overflow-hidden`}
          >
            <div
              className={`flex flex-col gap-4 bg-color-card-gradient-${theme} px-6 py-5 text-color-createAccountButton-${theme}`}
            >
              {/* Balance on top */}
              <p className="text-[48px] font-roboto font-semibold leading-none md:text-4xl">
                {formatCurrency(balance)}
              </p>

              {/* Bottom row with space-between */}
              <div className="flex items-center justify-between text-[16px] font-roboto opacity-90">
                {/* Left side YTD + NAV */}
                <div className="flex items-center gap-3">
                  <span>
                    YTD:{" "}
                    <span className="font-semibold font-roboto">
                      +{(ytd * 100).toFixed(2)}%
                    </span>
                  </span>
                  <span className="opacity-50">|</span>
                  <span>
                    NAV:{" "}
                    <span className="font-semibold font-roboto">
                      ${nav.toFixed(2)}
                    </span>
                  </span>
                </div>

                {/* Right side text */}
                <span
                  className={`hidden md:block text-color-draftAccounts-${theme}`}
                >
                  Class A as of 01/07/2025
                </span>
              </div>
            </div>
          </section>

          {/* Top grid: Investment Summary + Performance */}
          <section className="mb-6 grid grid-cols-2 gap-6 lg:grid-cols-2">
            {/* Investment Summary */}
            <div
              className={`bg-color-accountCard-${theme} rounded-xl  shadow-sm p-5`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2
                  className={`text-[22px] font-roboto font-semibold text-color-${theme}`}
                >
                  Investment Summary
                </h2>
                <div className="inline-flex items-center rounded-md px-1 py-1 border border-[#0072A1] font-roboto text-[14px] overflow-hidden">
                  {["Weekly", "Monthly", "Yearly"].map((t, i) => (
                    <button
                      key={t}
                      className={
                        "px-3 py-1.5 text-sm transition-colors " +
                        (i === 0
                          ? `border-color-button-${theme} bg-color-createAccountButton-${theme} text-white rounded-[8px] px-[5px] py-[10px]`
                          : `border-color-${theme} text-color-muted-${theme} hover:bg-color-selected-${theme}`)
                      }
                      aria-pressed={i === 0}
                    >
                      {t}
                    </button>
                  ))}

                  {/* More dropdown */}
                  <button
                    className={`flex items-center px-3 py-1.5 border-color-${theme} text-color-muted-${theme} hover:bg-color-selected-${theme}`}
                  >
                    More
                    <svg
                      className="ml-1 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p
                      className={`text-[16px] font-roboto text-color-muted-${theme}`}
                    >
                      Total Investment
                    </p>
                    <p
                      className={`text-[24px] font-roboto font-semibold text-color-${theme}`}
                    >
                      {formatCurrency(balance)}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-[16px] font-roboto text-color-muted-${theme}`}
                    >
                      Total Return
                    </p>
                    <p
                      className={`text-[24px] font-roboto font-semibold text-color-activeAccounts-${theme}`}
                    >
                      +{formatCurrency(totalReturn)} (9.69%)
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p
                      className={`text-[16px] font-roboto text-color-muted-${theme}`}
                    >
                      Current Value
                    </p>
                    <p
                      className={`text-[24px] font-roboto font-semibold text-color-${theme}`}
                    >
                      {formatCurrency(balance)}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-[16px] font-roboto text-color-muted-${theme}`}
                    >
                      Dividend Received
                    </p>
                    <p
                      className={`text-[24px] font-roboto font-semibold text-color-activeAccounts-${theme}`}
                    >
                      +{formatCurrency(totalReturn)} (9.69%)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance History */}
            <div
              className={`bg-color-accountCard-${theme} rounded-xl  shadow-sm p-5`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2
                  className={`text-[22px] font-roboto font-semibold text-color-${theme}`}
                >
                  Performance History
                </h2>
                <div className="inline-flex items-center rounded-md px-1 py-1 border border-[#0072A1] font-roboto text-[14px] overflow-hidden">
                  {["1 M", "3 M", "6 M", "1 Y", "YTD"].map((t, i) => (
                    <button
                      key={t}
                      className={
                        "px-3 py-1.5 text-sm transition-colors " +
                        (i === 0
                          ? `bg-color-createAccountButton-${theme} text-white rounded-[8px] px-[5px] py-[10px]`
                          : `text-color-muted-${theme} hover:bg-color-selected-${theme}`)
                      }
                      aria-pressed={i === 0}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceData}
                    margin={{ left: 10, right: 10 }}
                  >
                    <defs>
                      <linearGradient id="perf" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#04CAB5"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="95%"
                          stopColor="#04CAB5"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                    />
                    <YAxis
                      width={30}
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                      domain={["dataMin - 1", "dataMax + 1"]}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: 8, borderColor: "#e2e8f0" }}
                      labelClassName="text-slate-600"
                      formatter={(v: number) => [v.toFixed(2), "Value"]}
                      labelFormatter={(l) => `Day ${l}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#04CAB5"
                      strokeWidth={2}
                      fill="url(#perf)"
                      name="Value"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Bottom grid: NAV + Activities */}
          <section className="grid grid-cols-2 gap-6 lg:grid-cols-2">
            {/* NAV per Share */}
            <div
              className={`bg-color-accountCard-${theme} rounded-xl shadow-sm p-5`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2
                  className={`text-[22px] font-roboto font-semibold text-color-${theme}`}
                >
                  Net Asset Value (NAV) per share
                </h2>
                <div className="inline-flex items-center rounded-md px-1 py-1 border border-[#0072A1] font-roboto text-[14px] overflow-hidden gap-1">
                  {/* Month Select */}
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className={`appearance-none text-sm focus:outline-none cursor-pointer
          ${
            selectedMonth
              ? `bg-color-createAccountButton-${theme} text-white rounded-[8px] px-[5px] py-[10px]`
              : `bg-color-inputField-${theme} text-color-${theme} px-3 py-1.5`
          }`}
                  >
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                  </select>

                  {/* Year Select */}
                  <select
                    className={`appearance-none px-3 py-1.5 text-sm bg-color-inputField-${theme} text-color-${theme} focus:outline-none cursor-pointer`}
                  >
                    <option>2025</option>
                    <option>2024</option>
                    <option>2023</option>
                  </select>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={navData} margin={{ left: 10, right: 10 }}>
                    <defs>
                      <linearGradient id="nav" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#04CAB5"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="95%"
                          stopColor="#04CAB5"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                    />
                    <YAxis
                      width={30}
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                      domain={["dataMin - 1", "dataMax + 1"]}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: 8, borderColor: "#e2e8f0" }}
                      labelClassName="text-slate-600"
                      formatter={(v: number) => [`$${v.toFixed(2)}`, "NAV"]}
                      labelFormatter={(l) => `Day ${l}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#04CAB5"
                      strokeWidth={2}
                      fill="url(#nav)"
                      name="NAV"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activities */}
            <div
              className={`bg-color-accountCard-${theme} rounded-xl shadow-sm p-5`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2
                  className={`text-[22px] font-roboto font-semibold text-color-${theme}`}
                >
                  Recent Activities
                </h2>
                <button
                  className={`text-[16px] font-roboto text-color-${theme} `}
                >
                  Refresh Data
                </button>
              </div>

              <ul className="space-y-3">
                {activities.map((a, idx) => (
                  <li
                    key={`${a.title}-${idx}`}
                    className={`flex items-center justify-between rounded-lg p-3 bg-color-tableBody-${theme} `}
                  >
                    <div>
                      <p
                        className={`text-[16px] font-roboto  text-color-filterIcon-${theme}`}
                      >
                        {a.title}
                      </p>
                      <p
                        className={`text-[14px] font-roboto text-color-muted-${theme}`}
                      >
                        {a.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-[14px] font-roboto text-color-filterIcon-${theme}`}
                      >
                        {a.date}
                      </p>
                      <p
                        className={`text-[14px] font-roboto text-color-muted-${theme}`}
                      >
                        {a.timeAgo}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </section>
  );
}
