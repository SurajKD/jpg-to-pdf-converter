'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Inbox } from 'lucide-react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  return (
    <motion.div
      className={`rounded-2xl border border-gray-200 bg-white backdrop-blur-sm shadow-sm dark:border-slate-700/70 dark:bg-slate-900 ${
        hover ? 'hover:shadow-md hover:border-gray-300 dark:hover:border-slate-600 cursor-pointer' : ''
      } transition-all ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -2 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  size?: 'sm' | 'md' | 'lg'
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <Inbox className="w-16 h-16 text-gray-300" />,
  title,
  description,
  action,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'py-8',
    md: 'py-16',
    lg: 'py-24',
  }

  return (
    <div className={`text-center ${sizeClasses[size]}`}>
      <motion.div
        className="flex justify-center mb-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 max-w-sm mx-auto">{description}</p>}
      {action && (
        <motion.button
          onClick={action.onClick}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {action.label}
        </motion.button>
      )}
    </div>
  )
}

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  onDismiss?: () => void
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Error',
  message,
  onRetry,
  onDismiss,
}) => {
  return (
    <motion.div
      className="rounded-lg bg-red-50 border border-red-200 p-4 dark:bg-red-950/70 dark:border-red-500/40"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-900 dark:text-red-100">{title}</h3>
          <p className="text-sm text-red-800 dark:text-red-200 mt-1">{message}</p>
          {(onRetry || onDismiss) && (
            <div className="flex gap-2 mt-3">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="text-sm font-medium text-red-600 hover:text-red-700 underline"
                >
                  Try Again
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="text-sm font-medium text-red-600 hover:text-red-700 underline"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export const SuccessState: React.FC<{
  title?: string
  message: string
  icon?: React.ReactNode
}> = ({ title = 'Success', message, icon }) => {
  return (
    <motion.div
      className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 dark:bg-emerald-950/70 dark:border-emerald-500/40"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="flex items-start gap-3">
        {icon || <div className="w-5 h-5 text-emerald-500 mt-0.5">✓</div>}
        <div>
          <h3 className="text-sm font-semibold text-emerald-900">{title}</h3>
          <p className="text-sm text-emerald-800 mt-1">{message}</p>
        </div>
      </div>
    </motion.div>
  )
}
