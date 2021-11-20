import styles, { breakpoints} from '../styles';

describe('Grid styles', () => {
    describe('.grid', () => {
        it('should produce a default .grid class', () => {
            expect(styles.grid.display).toEqual(expect.any(Function));
        })

        describe('[display]', () => {
            it('should create a default .grid class with xl hidden display attribute', () => {
                const mockProps = {
                    container: true,
                    hidden: { xl: true }
                }

                expect(styles.grid.display(mockProps)).toEqual('none');
            });

            it('should create a default .grid class with xl container display attribute', () => {
                const mockProps = {
                    container: true,
                    hidden: { xl: false }
                }

                expect(styles.grid.display(mockProps)).toEqual('grid');
            });

            it('should create a default .grid class with xl default display attribute', () => {
                const mockProps = {
                    container: false,
                    hidden: { xl: false }
                }

                expect(styles.grid.display(mockProps)).toEqual('block');
            });
        });
    });

    describe('.container', () => {
        it('should produce a default .container class', () => {
            expect(styles.container.gap).toEqual(expect.any(Function));
        })

        describe('[gap]', () => {
            it('should use default gap size if no gap is provided in props', () => {
                expect(styles.container.gap({})).toEqual('1em');
            });

            it('should set gap size when it is 0', () => {
                const mockProps = { gap: 0 };

                expect(styles.container.gap(mockProps)).toEqual('0em');
            });

            it('should set the gap to em if a number is provided', () => {
                const mockProps = { gap: 2 };

                expect(styles.container.gap(mockProps)).toEqual('2em');
            });

            it('should set the gap to em if a numberic string is provided', () => {
                const mockProps = { gap: '2' };

                expect(styles.container.gap(mockProps)).toEqual('2em');
            });

            it('should set the gap to any generic size if the string is non-numeric', () => {
                const mockProps = { gap: '5%' };

                expect(styles.container.gap(mockProps)).toEqual('5%');
            });
        });
    });

    describe('.item', () => {
        it('should produce a default .item class', () => {
            expect(styles.item.gridColumn).toEqual(expect.any(Function));
        });

        describe('[gridColumn]', () => {
            it('should produce a [gridColumn] value with the correct starting column and span', () => {
                const mockProps = { offset: { xs: '3' }, width: { xs: '6' } };

                expect(styles.item.gridColumn(mockProps)).toEqual('4 / span 6');
            });

            it('should not produce [gridColumn] values with no width', () => {
                const mockProps = { offset: {}, width: { xs: '0' }};

                expect(styles.item.gridColumn(mockProps)).toEqual(undefined);
            });

            it('should not produce [gridColumn] values that are too wide', () => {
                const mockProps = { offset: {}, width: { xs: '13' }};

                expect(styles.item.gridColumn(mockProps)).toEqual(undefined);
            })

            it('should not produce [gridColumn] values with too great an offset', () => {
                const mockProps = { offset: { xs: 9 }, width: { xs: 4 } }; // 9 + 4 > 12

                expect(styles.item.gridColumn(mockProps)).toEqual(undefined);
            });

            it('should not produce [gridColumn] values with an invalid width', () => {
                const mockProps = { offset: { xs: 6 }, width: { xs: 'invalid' } }; // 9 + 4 > 12

                expect(styles.item.gridColumn(mockProps)).toEqual(undefined);
            });

            it('should not produce [gridColumn] values with an invalid offset', () => {
                const mockProps = { offset: { xs: 'invalid' }, width: { xs: '6' } }; // 9 + 4 > 12

                expect(styles.item.gridColumn(mockProps)).toEqual(undefined);
            });
        });
    });

    describe('@media screen and (breakpoint)', () => {
        const expectGrid = { 
            container: { gap: expect.any(Function) },
            grid: { display: expect.any(Function) },
            item: { gridColumn: expect.any(Function) }
        };

        it('should contain the correct breakpoints', () => {
            expect(styles).toEqual(expect.objectContaining({
                '@media screen and (max-width: 599px)': expectGrid,
                '@media screen and (min-width: 600px) and (max-width: 899px)': expectGrid,
                '@media screen and (min-width: 900px) and (max-width: 1199px)': expectGrid,
                '@media screen and (min-width: 1200px) and (max-width: 1535px)': expectGrid,
                '@media screen and (min-width: 1536px)': expectGrid,
            }));
        });

        it('should only set hidden properties when the size is set in the hidden prop', () => {
            const mockProps = {
                container: false,
                hidden: { xs: true, sm: false }
            }

            expect(styles['@media screen and (max-width: 599px)'].grid.display(mockProps, breakpoints[0])).toEqual('none');
            expect(styles['@media screen and (min-width: 600px) and (max-width: 899px)']
                .grid.display(mockProps, breakpoints[0])).toEqual('block');
        });
    });
});