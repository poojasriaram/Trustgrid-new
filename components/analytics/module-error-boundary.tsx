'use client'

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  moduleTitle: string
  children: ReactNode
  onRetry?: () => void
}

interface State {
  hasError: boolean
  error?: Error
}

export class ModuleErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error(`Error in module [${this.props.moduleTitle}]:`, error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
    if (this.props.onRetry) {
      this.props.onRetry()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-red-500/20 bg-red-950/20 p-6 text-slate-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-red-300">
                Unable to load {this.props.moduleTitle}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                An isolated error occurred while rendering this analytics dataset. Other dashboard modules remain fully functional.
              </p>
              <button
                onClick={this.handleRetry}
                className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Retry Module
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
