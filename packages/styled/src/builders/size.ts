import { columnSystem } from '@charcoal-ui/foundation'
import { CharcoalAbstractTheme } from '@charcoal-ui/theme'
import { px } from '@charcoal-ui/utils'
import { Internal, internal } from './internal'

export const fixedProperties = ['width', 'height'] as const
type FixedProperty = typeof fixedProperties[number]

export const createFixedPxCss =
  <T extends CharcoalAbstractTheme>(theme: T) =>
  (property: FixedProperty, size: keyof T['spacing'] | 'auto'): Internal =>
    internal(() => ({
      [property]: size === 'auto' ? 'auto' : px(theme.spacing[size]),
    }))

export const createFixedRelativeCss =
  <T extends CharcoalAbstractTheme>(_theme: T) =>
  (property: FixedProperty, amount: '100%' | 'auto'): Internal =>
    internal(() => ({
      [property]: amount,
    }))

export const createFixedColumnCss =
  <T extends CharcoalAbstractTheme>(theme: T) =>
  (property: FixedProperty, span: number): Internal =>
    internal(() => ({
      [property]: px(
        columnSystem(span, theme.grid.unit.column, theme.grid.unit.gutter)
      ),
    }))
