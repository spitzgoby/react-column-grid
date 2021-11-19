import styles, { breakpoints} from '../styles';

describe('Grid styles', () => {
    describe('.grid', () => {
        it('should create a default grid class with xl hidden display attribute', () => {
            const mockProps = {
                container: true,
                hidden: { xl: true }
            }

            expect(styles.grid.display(mockProps)).toEqual('none');
        });

        it('should create a default grid class with xl container display attribute', () => {
            const mockProps = {
                container: true,
                hidden: { xl: false }
            }

            expect(styles.grid.display(mockProps)).toEqual('grid');
        });

        it('should create a default grid class with xl default display attribute', () => {
            const mockProps = {
                container: false,
                hidden: { xl: false }
            }

            expect(styles.grid.display(mockProps)).toEqual('block');
        });
    });

    describe('@media screen and (breakpoint)', () => {
        const expectGrid = { grid: { display: expect.any(Function) } };

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