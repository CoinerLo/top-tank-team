import { RatingCell, RatingCellProps } from './RatingCell'
import { render } from '@testing-library/react'

const star = 'StarRateIcon'
const halfStar = 'StarHalfIcon'
const noStar = 'StarOutlineIcon'

const createReactElement = ({ rating }: RatingCellProps) => {
  const tableRow = document.createElement('tr')

  return render(<RatingCell rating={rating} />, {
    container: document.body.appendChild(tableRow),
  })
}

describe('Rating cell component', () => {
  describe('Prop rating = 0', () => {
    it('Renders 5 star outline icon', () => {
      const reactElement = createReactElement({ rating: 0 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${noStar}"]`)
      ).toHaveLength(5)
    })
  })
  describe('Prop rating = 0.5', () => {
    it('Renders 1 half star icon', () => {
      const reactElement = createReactElement({ rating: 0.5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${halfStar}"]`)
      ).toHaveLength(1)
    })
    it('Renders 4 star outline icon', () => {
      const reactElement = createReactElement({ rating: 0.5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${noStar}"]`)
      ).toHaveLength(4)
    })
  })
  describe('Prop rating = 1', () => {
    it('Renders 1 star icon', () => {
      const reactElement = createReactElement({ rating: 1 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${star}"]`)
      ).toHaveLength(1)
    })
    it('Renders 4 star outline icon', () => {
      const reactElement = createReactElement({ rating: 1 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${noStar}"]`)
      ).toHaveLength(4)
    })
  })
  describe('Prop rating = 1.5', () => {
    it('Renders 1 star icon', () => {
      const reactElement = createReactElement({ rating: 1.5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${star}"]`)
      ).toHaveLength(1)
    })
    it('Renders 1 half star icon', () => {
      const reactElement = createReactElement({ rating: 1.5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${halfStar}"]`)
      ).toHaveLength(1)
    })
    it('Renders 3 star outline icon', () => {
      const reactElement = createReactElement({ rating: 1.5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${noStar}"]`)
      ).toHaveLength(3)
    })
  })
  describe('Prop rating = 2', () => {
    it('Renders 2 star icon', () => {
      const reactElement = createReactElement({ rating: 2 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${star}"]`)
      ).toHaveLength(2)
    })
    it('Renders 3 star outline icon', () => {
      const reactElement = createReactElement({ rating: 2 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${noStar}"]`)
      ).toHaveLength(3)
    })
  })
  describe('Prop rating = 2.5', () => {
    it('Renders 2 star icon', () => {
      const reactElement = createReactElement({ rating: 2.5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${star}"]`)
      ).toHaveLength(2)
    })
    it('Renders 1 half star icon', () => {
      const reactElement = createReactElement({ rating: 2.5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${halfStar}"]`)
      ).toHaveLength(1)
    })
    it('Renders 2 star outline icon', () => {
      const reactElement = createReactElement({ rating: 2.5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${noStar}"]`)
      ).toHaveLength(2)
    })
  })
  describe('Prop rating = 3', () => {
    it('Renders 3 star icon', () => {
      const reactElement = createReactElement({ rating: 3 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${star}"]`)
      ).toHaveLength(3)
    })
    it('Renders 2 star outline icon', () => {
      const reactElement = createReactElement({ rating: 3 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${noStar}"]`)
      ).toHaveLength(2)
    })
  })
  describe('Prop rating = 3.5', () => {
    it('Renders 3 star icon', () => {
      const reactElement = createReactElement({ rating: 3.5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${star}"]`)
      ).toHaveLength(3)
    })
    it('Renders 1 half star icon', () => {
      const reactElement = createReactElement({ rating: 3.5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${halfStar}"]`)
      ).toHaveLength(1)
    })
    it('Renders 1 star outline icon', () => {
      const reactElement = createReactElement({ rating: 3.5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${noStar}"]`)
      ).toHaveLength(1)
    })
  })
  describe('Prop rating = 4', () => {
    it('Renders 4 star icon', () => {
      const reactElement = createReactElement({ rating: 4 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${star}"]`)
      ).toHaveLength(4)
    })
    it('Renders 1 star outline icon', () => {
      const reactElement = createReactElement({ rating: 4 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${noStar}"]`)
      ).toHaveLength(1)
    })
  })
  describe('Prop rating = 4.5', () => {
    it('Renders 4 star icon', () => {
      const reactElement = createReactElement({ rating: 4.5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${star}"]`)
      ).toHaveLength(4)
    })
    it('Renders 1 half star icon', () => {
      const reactElement = createReactElement({ rating: 4.5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${halfStar}"]`)
      ).toHaveLength(1)
    })
  })
  describe('Prop rating = 5', () => {
    it('Renders 5 star icon', () => {
      const reactElement = createReactElement({ rating: 5 })

      expect(
        reactElement.container.querySelectorAll(`[data-testid="${star}"]`)
      ).toHaveLength(5)
    })
  })
})
