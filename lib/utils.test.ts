import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
    it('should merge basic strings', () => {
        expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should handle undefined and null', () => {
        expect(cn('class1', undefined, 'class2', null)).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
        expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2');
    });

    it('should properly merge tailwind classes', () => {
        // twMerge ensures the latter tailwind class overrides the former if they conflict
        expect(cn('p-2', 'p-4')).toBe('p-4');
        expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
        expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });

    it('should handle arrays', () => {
        expect(cn(['class1', 'class2'])).toBe('class1 class2');
    });

    it('should handle objects', () => {
        expect(cn({ class1: true, class2: false, class3: true })).toBe('class1 class3');
    });

    it('should handle mixed inputs', () => {
        expect(cn(
            'class1',
            ['class2', 'class3'],
            { class4: true, class5: false },
            undefined,
            'p-2',
            'p-4'
        )).toBe('class1 class2 class3 class4 p-4');
    });
});
