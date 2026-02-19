import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Save,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface ScheduleItem {
  id: number;
  title: string;
  description?: string;
  note?: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  duration: number; // days
}

const INITIAL_ITEMS: ScheduleItem[] = [
  {
    id: 1,
    title: "Penyampaian Dokumen Kelengkapan dan Revisi Dokumen",
    description:
      "(termasuk pemeriksaan form TKDN) dan pengisian SMART GEP sampai dengan approve dan submit...",
    note: "SLA registrasi penyedia barang/jasa adalah 22 hari kerja oleh iVendor SSC",
    startDate: "",
    endDate: "",
    duration: 0,
  },
  {
    id: 2,
    title: "Perintah Pengadaan/Flip To Project",
    startDate: "",
    endDate: "",
    duration: 0,
  },
  {
    id: 3,
    title: "Penyiapan Dokumen SPPH/RFx",
    startDate: "",
    endDate: "",
    duration: 0,
  },
  {
    id: 4,
    title: "Surat Permintaan Penawaran Harga/RFx",
    startDate: "",
    endDate: "",
    duration: 0,
  },
  { id: 5, title: "Pre-Bid Meeting", startDate: "", endDate: "", duration: 0 },
  {
    id: 6,
    title: "Peninjauan Lapangan, jika diperlukan",
    startDate: "",
    endDate: "",
    duration: 0,
  },
  {
    id: 7,
    title: "Penyampaian Jawaban atas Pertanyaan",
    startDate: "",
    endDate: "",
    duration: 0,
  },
  {
    id: 8,
    title: "Pemasukan penawaran",
    startDate: "",
    endDate: "",
    duration: 0,
  },
  {
    id: 9,
    title: "Evaluasi penawaran (Adm dan Teknis) *)",
    startDate: "",
    endDate: "",
    duration: 0,
  },
  {
    id: 10,
    title: "Surat Undangan Klarifikasi dan Negosiasi *)",
    startDate: "",
    endDate: "",
    duration: 0,
  },
  {
    id: 11,
    title: "Klarifikasi & Negosiasi Harga",
    startDate: "",
    endDate: "",
    duration: 0,
  },
  {
    id: 12,
    title: "BAHP dan penyampaian BAHP",
    startDate: "",
    endDate: "",
    duration: 0,
  },
  {
    id: 13,
    title: "Penetapan Pemenang",
    startDate: "",
    endDate: "",
    duration: 0,
  },
  {
    id: 14,
    title: "Penunjukan pelaksana pekerjaan/Award",
    startDate: "",
    endDate: "",
    duration: 0,
  },
  {
    id: 15,
    title: "Penandatanganan Kontrak (oleh Pengguna)",
    startDate: "",
    endDate: "",
    duration: 0,
  },
];

const Jadwal: React.FC = () => {
  const [items, setItems] = useState<ScheduleItem[]>(INITIAL_ITEMS);
  const [viewDate, setViewDate] = useState(new Date());
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Helper to calculate duration between two dates
  const calculateDuration = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e.getTime() - s.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive
    return diffDays;
  };

  // Helper to calculate end date from start + duration
  const calculateEndDate = (start: string, duration: number): string => {
    if (!start || duration < 1) return "";
    const s = new Date(start);
    s.setDate(s.getDate() + duration - 1);
    const year = s.getFullYear();
    const month = String(s.getMonth() + 1).padStart(2, "0");
    const day = String(s.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (
    id: number,
    field: "startDate" | "endDate",
    value: string,
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updates: Partial<ScheduleItem> = { [field]: value };

        if (field === "startDate") {
          if (item.endDate) {
            if (new Date(value) > new Date(item.endDate)) {
              updates.endDate = value;
              updates.duration = 1;
            } else {
              updates.duration = calculateDuration(value, item.endDate);
            }
          } else if (item.duration > 0) {
            updates.endDate = calculateEndDate(value, item.duration);
          }
        } else if (field === "endDate") {
          if (item.startDate) {
            if (new Date(value) < new Date(item.startDate)) {
              updates.startDate = value;
              updates.duration = 1;
            } else {
              updates.duration = calculateDuration(item.startDate, value);
            }
          }
        }

        return { ...item, ...updates };
      }),
    );
  };

  const handleDurationChange = (id: number, value: string) => {
    const duration = parseInt(value) || 0;
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updates: Partial<ScheduleItem> = { duration };
        if (item.startDate && duration > 0) {
          updates.endDate = calculateEndDate(item.startDate, duration);
        }
        return { ...item, ...updates };
      }),
    );
  };

  // Timeline Generation
  const { days, weeks } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArr: Date[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      daysArr.push(new Date(year, month, i));
    }

    // Group into weeks
    const weeksMap: { label: string; colSpan: number }[] = [];
    let currentWeekSpan = 0;
    let weekNumber = 1;

    daysArr.forEach((day, index) => {
      // Start a new week on Monday, but not if it's the very first day of the month
      if (day.getDay() === 1 && index !== 0) {
        weeksMap.push({
          label: `Minggu ${weekNumber}`,
          colSpan: currentWeekSpan,
        });
        weekNumber++;
        currentWeekSpan = 0;
      }
      currentWeekSpan++;
    });

    // Push the last week
    if (currentWeekSpan > 0) {
      weeksMap.push({
        label: `Minggu ${weekNumber}`,
        colSpan: currentWeekSpan,
      });
    }

    return { days: daysArr, weeks: weeksMap };
  }, [viewDate]);

  const monthName = viewDate.toLocaleString("id-ID", {
    month: "long",
    year: "numeric",
  });

  const getDayColor = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6 ? "bg-slate-50" : "bg-white";
  };

  const getBarPosition = (item: ScheduleItem) => {
    if (!item.startDate || !item.endDate) return null;

    const start = new Date(item.startDate);
    const firstDay = days[0];
    const lastDay = days[days.length - 1];

    if (new Date(item.endDate) < firstDay || start > lastDay) return null;

    let startIndex = days.findIndex(
      (d) =>
        d.getDate() === start.getDate() && d.getMonth() === start.getMonth(),
    );

    if (startIndex === -1) {
      if (start < firstDay) {
        startIndex = 0;
      } else {
        return null;
      }
    }

    const end = new Date(item.endDate);
    const visibleEnd = end > lastDay ? lastDay : end;
    const visibleStart = start < firstDay ? firstDay : start;

    const diffTime = Math.abs(visibleEnd.getTime() - visibleStart.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return {
      left: startIndex * 40,
      width: diffDays * 40,
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
        {/* Top Controls */}
        <div className="bg-blue-600 p-4 text-white flex flex-col md:flex-row justify-between items-start md:items-center shrink-0 z-20 relative gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            <div>
              <h1 className="text-xl font-bold">Jadwal Pengadaan</h1>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            <div className="flex items-center justify-between bg-blue-700 rounded-lg p-1 w-full sm:w-auto">
              <button
                onClick={() =>
                  setViewDate(
                    new Date(viewDate.setMonth(viewDate.getMonth() - 1)),
                  )
                }
                className="p-1 hover:bg-blue-600 rounded"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="px-4 font-medium min-w-[140px] text-center">
                {monthName}
              </span>
              <button
                onClick={() =>
                  setViewDate(
                    new Date(viewDate.setMonth(viewDate.getMonth() + 1)),
                  )
                }
                className="p-1 hover:bg-blue-600 rounded"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <button className="flex items-center justify-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors w-full sm:w-auto">
              <Save size={16} />
              Simpan Jadwal
            </button>
          </div>
        </div>

        {/* Unified Scrollable Container */}
        <div className="flex-1 overflow-auto relative scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
          <div className="min-w-max">
            {/* Sticky Header Row */}
            <div className="flex sticky top-0 z-20 bg-slate-50 border-b border-slate-200 shadow-sm">
              {/* Top-Left Corner (Sticky Left + Sticky Top) */}
              <div
                className={`sticky left-0 z-30 shrink-0 border-r border-slate-200 p-3 font-bold text-slate-700 text-sm bg-slate-50 flex items-end justify-between shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] transition-all duration-300 ${
                  isMobileExpanded ? "w-[300px]" : "w-[80px]"
                } md:w-[450px]`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className={isMobileExpanded ? "" : "hidden md:inline"}>
                    Nama Tahapan
                  </span>
                </div>

                {/* Mobile Toggle Button */}
                <button
                  onClick={() => setIsMobileExpanded(!isMobileExpanded)}
                  className="md:hidden p-1 rounded-full hover:bg-slate-200 text-blue-600"
                >
                  {isMobileExpanded ? (
                    <PanelLeftClose size={16} />
                  ) : (
                    <PanelLeftOpen size={16} />
                  )}
                </button>

                <span className="text-xs font-normal text-slate-500 hidden md:inline">
                  Geser untuk melihat detail &rarr;
                </span>
              </div>

              {/* Timeline Header (Sticky Top only) */}
              <div className="flex flex-col bg-slate-50 z-20">
                {/* Weeks */}
                <div className="flex border-b border-slate-200">
                  {weeks.map((week, idx) => (
                    <div
                      key={idx}
                      className="text-xs font-bold text-slate-500 text-center py-1 border-r border-slate-200 bg-slate-100"
                      style={{ width: week.colSpan * 40 }}
                    >
                      {week.label}
                    </div>
                  ))}
                </div>
                {/* Days */}
                <div className="flex">
                  {days.map((day) => (
                    <div
                      key={day.toISOString()}
                      className={`w-[40px] shrink-0 border-r border-slate-200 flex flex-col items-center justify-center py-1 ${getDayColor(day)}`}
                    >
                      <span className="text-[10px] text-slate-500 font-medium">
                        {day.toLocaleDateString("id-ID", { weekday: "narrow" })}
                      </span>
                      <span className="text-sm font-bold text-slate-700">
                        {day.getDate()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Body Rows */}
            {items.map((item) => (
              <div
                key={item.id}
                className="flex border-b border-slate-100 hover:bg-slate-50 transition-colors group"
              >
                {/* Left Card (Sticky Left) */}
                <div
                  className={`sticky left-0 z-30 shrink-0 border-r border-slate-200 p-3 bg-white group-hover:bg-slate-50 transition-all duration-300 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] ${
                    isMobileExpanded ? "w-[300px]" : "w-[80px]"
                  } md:w-[450px]`}
                >
                  <div className="flex gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.id}
                    </div>
                    <div
                      className={isMobileExpanded ? "block" : "hidden md:block"}
                    >
                      <div className="font-medium text-slate-800 text-sm leading-tight">
                        {item.title}
                      </div>
                      {item.note && (
                        <div className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                          <AlertCircle size={10} /> {item.note}
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={`grid grid-cols-3 gap-1 md:gap-2 mt-3 ${
                      isMobileExpanded ? "block" : "hidden md:grid"
                    }`}
                  >
                    <div>
                      <label className="block text-[10px] uppercase text-slate-500 font-bold mb-1">
                        Mulai
                      </label>
                      <input
                        type="date"
                        value={item.startDate}
                        onChange={(e) =>
                          handleDateChange(item.id, "startDate", e.target.value)
                        }
                        className="w-full text-xs p-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-500 font-bold mb-1">
                        Selesai
                      </label>
                      <input
                        type="date"
                        value={item.endDate}
                        onChange={(e) =>
                          handleDateChange(item.id, "endDate", e.target.value)
                        }
                        className="w-full text-xs p-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-500 font-bold mb-1">
                        Durasi
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={item.duration}
                        onChange={(e) =>
                          handleDurationChange(item.id, e.target.value)
                        }
                        className="w-full text-xs p-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 outline-none text-center font-medium bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Timeline Bar (Scrollable) */}
                <div className="relative h-auto min-h-[120px]">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex pointer-events-none h-full">
                    {days.map((day) => (
                      <div
                        key={day.toISOString()}
                        className={`w-[40px] shrink-0 border-r border-slate-100 ${getDayColor(day)} h-full`}
                      ></div>
                    ))}
                  </div>

                  {/* Bar */}
                  {(() => {
                    const pos = getBarPosition(item);
                    if (pos) {
                      return (
                        <div
                          className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full bg-blue-500 shadow-sm border border-blue-600 flex items-center px-3 text-white text-xs font-bold whitespace-nowrap overflow-hidden transition-all z-10 hover:bg-blue-600 cursor-pointer"
                          style={{
                            left: pos.left + "px",
                            width: pos.width + "px",
                          }}
                          title={`${item.duration} Hari`}
                        >
                          {item.duration > 2 && `${item.duration} Hari`}
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Jadwal;
