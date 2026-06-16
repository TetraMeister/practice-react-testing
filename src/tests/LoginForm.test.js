describe('mock', () => {
  it('jest.fn()', async () => {
    const tryAuth = jest.fn();

    tryAuth.mockReturnValueOnce(true);
    tryAuth.mockReturnValueOnce(false);
    tryAuth.mockRejectedValue(new Error('unauthorized'));
    
    const newArr = ['a', 'b'].map(tryAuth);
    expect(tryAuth).toHaveBeenCalledTimes(2);
    expect(newArr).toEqual([true, false]);

    return tryAuth().catch(
      err => expect(err.message).toBe('unauthorized')
    )
  })
})