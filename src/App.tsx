import { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { poems, Poem } from './data/poems';
import { PoemDisplay } from './components/PoemDisplay';

interface PoemWithIndex {
  poem: Poem;
  index: number;
  total: number;
}

interface DailyData {
  date: string;
  dayNumber: number;
  hebrewDate: string;
}

function App() {
  const [poemData, setPoemData] = useState<PoemWithIndex | null>(null);
  const [dailyData, setDailyData] = useState<DailyData | null>(null);
  const [loading, setLoading] = useState(true);

  const getTodayPoem = () => {
    try {
      setLoading(true);

      if (poems.length === 0) {
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      const dayNumber = Math.floor(
        (new Date(today).getTime() - new Date('2025-11-04').getTime()) / (1000 * 60 * 60 * 24)
      );

      const poemIndex = dayNumber % poems.length;

      // Format date in Hebrew and numeric
      const todayDate = new Date(today);
      const hebrewDate = todayDate.toLocaleDateString('he-IL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Format as DD/MM/YYYY
      const numericDate = todayDate.toLocaleDateString('he-IL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

      setPoemData({
        poem: poems[poemIndex],
        index: poemIndex + 1,
        total: poems.length,
      });

      setDailyData({
        date: numericDate,
        dayNumber: dayNumber + 1,
        hebrewDate: hebrewDate
      });
    } catch (err) {
      console.error('Error loading poem:', err);
    } finally {
      setLoading(false);
    }
  };

  const navigatePoem = (direction: 'next' | 'prev') => {
    if (!poemData || poems.length === 0) return;

    let newIndex = poemData.index - 1;
    if (direction === 'next') {
      newIndex = (newIndex + 1) % poems.length;
    } else {
      newIndex = (newIndex - 1 + poems.length) % poems.length;
    }

    setPoemData({
      poem: poems[newIndex],
      index: newIndex + 1,
      total: poems.length,
    });
  };

  useEffect(() => {
    getTodayPoem();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-2 w-48 bg-slate-700 rounded mx-auto"></div>
            <div className="h-2 w-32 bg-slate-700 rounded mx-auto"></div>
          </div>
          <p className="mt-8 text-slate-400" dir="rtl">טוען שיר היום...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto">
        <div className="flex justify-between items-center pt-6 px-4 md:px-0">
          <button
            onClick={() => navigatePoem('prev')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
            dir="rtl"
            aria-label="שיר קודם"
          >
            <ChevronRight size={24} />
          </button>

          {poemData && (
            <div className="text-center text-sm text-slate-500" dir="rtl">
              <span>{poemData.index} / {poemData.total}</span>
            </div>
          )}

          <button
            onClick={() => navigatePoem('next')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
            dir="rtl"
            aria-label="שיר הבא"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        {dailyData && (
          <div className="mt-6 px-4 md:px-0" dir="rtl">
            <div className="max-w-3xl mx-auto bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700/50 p-4 md:p-6">
              <div className="text-center space-y-2">
                <h2 className="text-slate-300 text-lg md:text-xl font-semibold">
                  {dailyData.date}
                </h2>
                <p className="text-slate-400 text-sm md:text-base">
                  יום {dailyData.dayNumber} במחזור השירים
                </p>
              </div>
            </div>
          </div>
        )}

        {poemData && (
          <div className="mt-4">
            <PoemDisplay poem={poemData.poem} />
          </div>
        )}
      </div>

      <footer className="text-center py-12 text-slate-600 text-sm" dir="rtl">
        <p className="mb-1">שירי יהודה עמיחי</p>
        <p className="text-xs">שיר אחד כל יום</p>
      </footer>
    </div>
  );
}

export default App;
