package app

import (
	"context"
	"time"
	"asas-workbench/backend/internal/settings"
	"asas-workbench/backend/internal/workspace"
)

type App struct {
	ctx       context.Context
	settings  *settings.Service
	workspace *workspace.Service
}

func New() *App {
	return &App{
		settings:  settings.NewService(),
		workspace: workspace.NewService(),
	}
}

func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Health() map[string]any {
	return map[string]any{
		"ok":   true,
		"time": time.Now().UTC().Format(time.RFC3339),
	}
}

func (a *App) GetSettings() settings.Settings {
	return a.settings.Get()
}

func (a *App) SetTheme(theme string) error {
	return a.settings.SetTheme(theme)
}

func (a *App) GetWorkspaceSummary() workspace.Summary {
	return a.workspace.Summary()
}
