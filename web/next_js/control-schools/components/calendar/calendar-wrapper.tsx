export function CalendarWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="calendar-container custom-theme-colors">
            {children}
            <style jsx global>{`
        .fc { --fc-border-color: #e5e7eb; --fc-button-bg-color: #3b82f6; }
        .fc .fc-toolbar-title { font-size: 1.25rem; font-weight: 700; }
      `}</style>
        </div>
    )
}