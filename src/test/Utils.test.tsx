import hasUnicodeCharacters from "../utils/hasUnicodeCharacters";
import removeLeadingZeros from "../utils/removeLeadingZeros";

describe('Check if unicode characters are present', () => {
    const cases = [
        {
            string: 'Hello 😀',
            expected: true,
            description: 'should find unicode characters'
        },
        {
            string: 'Hello',
            expected: false,
            description: 'should not find unicode characters'
        }
    ]
    
    cases.forEach(({description, string, expected}) => {
        test(description, () => {
            const result = hasUnicodeCharacters(string);
            expect(result).toEqual(expected);
        });
    })
})

describe("Check if leading zeros are removed", ()=>{
    test('should remove leading zeros', () => {
        const cases = [
            {
                code: '05678',
                expected: '5678',
            },
            {
                code: '1234',
                expected: '1234',
            },
            {
                code: '00000',
                expected: '',
            },
            {
                code: '',
                expected: '',
            }
        ]
        cases.forEach(({code, expected}) => {
            const result = removeLeadingZeros(code);
            expect(result).toEqual(expected);
        })
    });
});
